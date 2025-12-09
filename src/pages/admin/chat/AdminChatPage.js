import React, { useEffect, useState, useRef } from 'react';
import ChatListPage from './ChatListPage';
import { getChatRoomList, getHistory } from '../../../api/chatApi';
import { getCookie } from '../../../util/cookieUtil';
import { disconnectSocket, connectSocket, publishMessage } from '../../../api/socketApi';

const AdminChatPage = () => {
  const [chatList, setChatList] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const stompClient = useRef(null);
  const subscribtionRef = useRef(null);

  const token = getCookie("member")?.accessToken;

  // 1. 방 목록 불러오기 함수 (재사용을 위해 useEffect 밖으로 뺌)


  useEffect(() => {
    if (token) {
      const loadRoom = async () => {
        try {
          const data = await getChatRoomList();
          setChatList(data);
        } catch (error) {
          console.log("목록 로드 실패");
        }
      };
      loadRoom();
      connectSocket(stompClient, "ADMIN_Connect", token, () => { });
    }
    return () => disconnectSocket(stompClient);
  }, [token]);
  // [새로 추가] 대화 내용(messages)이 바뀔 때마다 왼쪽 목록(chatList) 동기화
  useEffect(() => {
    // 메시지가 없거나 방이 선택 안 됐으면 무시
    if (!currentRoomId || messages.length === 0) return;

    // 1. 방금 도착한(혹은 보낸) 가장 최신 메시지 가져오기
    const lastMsg = messages[messages.length - 1];

    // 2. 목록(chatList) 업데이트
    setChatList(prevList => prevList.map(room => {
      if (room.roomId === currentRoomId) {
        
        // [핵심 로직] 보낸 사람(sender)이 현재 방 유저(currentRoomId)와 같으면 -> 유저가 보낸 것
        // 유저가 보냈으면(isUser = true) -> isReplied는 false (답장해야 함!)
        // 내가 보냈으면(isUser = false) -> isReplied는 true (답장 완료!)
        const isUser = lastMsg.sender == currentRoomId; 

        return {
          ...room,
          lastMessage: lastMsg.message,      // 메시지 내용 갱신
          lastSendAt: lastMsg.createdAt || new Date().toISOString(), // 시간 갱신
          replied: !isUser                 // 유저가 보냈으면 false(빨간점), 내가 보냈으면 true
        };
      }
      return room;
    }));
  }, [messages, currentRoomId]);

  const handleRoomClick = async (roomId) => {
    if (currentRoomId === roomId) return;

    console.log("방 입장:", roomId);
    setCurrentRoomId(roomId);

    try {
      const historyData = await getHistory(roomId);
      setMessages(historyData);
    } catch (error) {
      setMessages([]);
    }

    if (subscribtionRef.current) {
      subscribtionRef.current.unsubscribe();
    }

    if (stompClient.current && stompClient.current.connected) {
      subscribtionRef.current = stompClient.current.subscribe(
        `/sub/chat/room/${roomId}`,
        (message) => {
          const received = JSON.parse(message.body);
          setMessages((prev) => [...prev, received]);
          setChatList((prevList) => prevList.map(room => {
            if (room.roomId === roomId) {
              const isAdmin = received.sender !== roomId; // 보낸 사람이 User(roomId)가 아니면 Admin으로 간주
              return {
                ...room,
                lastMessage: received.message,
                lastSendAt: new Date().toISOString(), // 현재 시간으로 갱신
                replied: isAdmin // Admin이 보냈으면 true(답장완료), User가 보냈으면 false(답장대기)
              };
            }
            return room;
          }))
        }
      );
    }
  }

  // [중요 수정] 메시지 전송 시 목록 상태도 업데이트
  const sendMessage = () => {
    if (!input.trim() || !currentRoomId) return;

    // 1. 소켓 전송
    publishMessage(stompClient, currentRoomId, input);

    // 2. 왼쪽 목록(chatList) 수동 업데이트 (화면 갱신용)
    // -> 이걸 해줘야 목록에서 "답장함"으로 즉시 바뀝니다.
    setChatList(prevList => prevList.map(room => {
      if (room.roomId === currentRoomId) {
        return {
          ...room,
          lastMessage: input, // 목록에 미리보기 내용 갱신
          lastSendAt: new Date().toISOString(),
          sender: 'admin',
          replied: true // 혹은 'ADMIN'. (목록에서 내 아이디랑 비교하는 값으로 설정)
          // 주의: ChatListPage에서 "누가 보냈는지" 판단하는 필드(sender)를
          // 관리자임을 나타내는 값으로 바꿔주세요.
          // 보통 sender가 user id와 다르면 관리자가 보낸 걸로 인식합니다.
        };
      }
      return room;
    }));

    setInput("");
  }

  return (
    <div style={{
      display: 'flex',
      height: '80vh',
      margin: '20px',
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      overflow: 'hidden'
    }}>

      {/* 왼쪽 목록 영역 */}
      <div style={{
        width: '320px',
        borderRight: '1px solid #f0f0f0',
        backgroundColor: '#fcfcfc',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '20px', fontWeight: 'bold', fontSize: '18px', borderBottom: '1px solid #f0f0f0' }}>
          채팅 목록
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ChatListPage
            chatList={chatList || []}
            onSelect={handleRoomClick}
            currentRoomId={currentRoomId}
          />
        </div>
      </div>

      {/* 오른쪽 채팅창 영역 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
        {currentRoomId ? (
          <>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #f0f0f0',
              fontWeight: '600',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></div>
              User {currentRoomId}
            </div>

            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: '#f8f9fa'
            }}>
              {messages.map((msg, idx) => {
                const isAdmin = msg.sender !== currentRoomId;

                return (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isAdmin ? 'flex-end' : 'flex-start'
                  }}>
                    <span style={{ fontSize: '11px', color: '#999', marginBottom: '4px', padding: '0 4px' }}>
                      {msg.sender}
                    </span>

                    <div style={{
                      maxWidth: '70%',
                      padding: '10px 14px',
                      borderRadius: isAdmin ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      backgroundColor: isAdmin ? '#4A90E2' : '#fff',
                      color: isAdmin ? '#fff' : '#333',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      wordBreak: 'break-word'
                    }}>
                      {msg.message}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: '20px', borderTop: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
              <div style={{
                display: 'flex',
                gap: '10px',
                backgroundColor: '#f0f2f5',
                padding: '10px',
                borderRadius: '24px'
              }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    padding: '8px',
                    outline: 'none',
                    fontSize: '14px'
                  }}
                  placeholder="메시지를 입력하세요..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  style={{
                    padding: '8px 20px',
                    background: '#4A90E2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  전송
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#adb5bd',
            gap: '10px'
          }}>
            <div style={{ fontSize: '48px' }}>💬</div>
            <div>좌측 목록에서 대화할 상대를 선택해주세요.</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminChatPage;