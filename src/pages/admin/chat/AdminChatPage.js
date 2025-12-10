import React, { useEffect, useState, useRef } from 'react';
import ChatListPage from './ChatListPage';
import { getChatRoomList, getHistory } from '../../../api/chatApi'; 
import { getCookie } from '../../../util/cookieUtil';
import { disconnectSocket, connectSocket, subscribeRoom, publishMessage } from '../../../api/socketApi';

const AdminChatPage = () => {
  const [chatList, setChatList] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const stompClient = useRef(null);
  const currentRoomIdRef = useRef(null); 
  const token = getCookie("member")?.accessToken;

  // 관리자 ID 상수 (로그상 "admin"으로 확인됨)
  const ADMIN_ID = "admin";

  useEffect(() => {
    currentRoomIdRef.current = currentRoomId;
  }, [currentRoomId]);

  // 1. 초기화 (목록 불러오기 + 소켓 연결)
  useEffect(() => {
    if (!token) return;

    const init = async () => {
      try {
        const listData = await getChatRoomList();
        
        // ★ [초기 데이터 정제]
        // 만약 처음 가져온 목록에 "admin"이라고 되어 있다면,
        // 어쩔 수 없이 임시로 "User"라고 표시하거나, 
        // 백엔드에서 user_id 필드가 있다면 그것을 사용해야 합니다.
        // 여기서는 일단 기존 값을 유지합니다.
        setChatList(listData);
        console.log("채팅방 리스트=",listData)
        connectSocket(stompClient, token, () => {
          console.log(`[Init] 총 ${listData.length}개의 방 구독 시작`);
          listData.forEach(room => {
            subscribeRoom(stompClient, room.roomId, (msg) => {
              handleSocketMessage(msg);
            });
          });
        });

      } catch (error) {
        console.error("초기화 실패", error);
      }
    };

    init();

    return () => disconnectSocket(stompClient);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // 2. 소켓 메시지 수신 처리
  const handleSocketMessage = (newMsg) => {
    const msgSender = newMsg.sender || newMsg.senderId;

    setChatList(prevList => prevList.map(room => {
      if (room.roomId === newMsg.roomId) {
        
        // 보낸 사람이 admin인지 확인
        const isAdminSender = String(msgSender) === ADMIN_ID;

        // ★ [핵심 수정] 리스트에 표시될 ID(이름) 결정 로직
        // 1. 관리자가 보냈다? -> 절대로 이름을 바꾸지 마라! (기존 유저 ID 유지: room.senderId)
        // 2. 유저가 보냈다? -> 그 유저 ID로 업데이트 (msgSender)
        const displayId = isAdminSender ? room.senderId : msgSender;

        return {
          ...room,
          lastMessage: newMsg.message,
          lastSendAt: newMsg.createdAt || new Date().toISOString(),
          
          // 여기서 결정된 ID를 넣음 (이제 admin이 메시지 보내도 이름이 안 바뀜)
          senderId: room.senderId,
          
          // 빨간점/파란점 스타일 결정 (관리자가 아니면 ROLE_USER)
          senderRole: !isAdminSender ? "ROLE_USER" : "ROLE_ADMIN",
          
          unreadCount: (currentRoomIdRef.current !== newMsg.roomId) 
            ? (room.unreadCount || 0) + 1 
            : 0
        };
      }
      return room;
    }).sort((a, b) => new Date(b.lastSendAt) - new Date(a.lastSendAt)));

    if (currentRoomIdRef.current === newMsg.roomId) {
      setMessages(prev => [...prev, newMsg]);
    }
  };

  // 3. 방 클릭
  const handleRoomClick = async (roomId) => {
    if (currentRoomId === roomId) return;
    setCurrentRoomId(roomId);

    try {
      const history = await getHistory(roomId);
      setMessages(history);
      
      setChatList(prev => prev.map(r => 
        r.roomId === roomId ? { ...r, unreadCount: 0 } : r
      ));
    } catch (error) {
      console.log(error);
    }
  };

  // 4. 전송
  const sendMessage = () => {
    if (!input.trim() || !currentRoomId) return;
    publishMessage(stompClient, currentRoomId, input);
    setInput("");
  };

  // 현재 방의 유저 ID 찾기 (목록에서 가져옴)
  const currentRoomObj = chatList.find(r => r.roomId === currentRoomId);
  const roomOwnerId = currentRoomObj ? currentRoomObj.senderId : "";

  return (
    <div style={{ display: 'flex', height: '80vh', margin: '20px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      
      {/* 목록 영역 */}
      <div style={{ width: '320px', borderRight: '1px solid #f0f0f0', backgroundColor: '#fcfcfc', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', fontWeight: 'bold', fontSize: '18px', borderBottom: '1px solid #f0f0f0' }}>채팅 목록</div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ChatListPage chatList={chatList || []} onSelect={handleRoomClick} currentRoomId={currentRoomId} />
        </div>
      </div>

      {/* 채팅창 영역 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
        {currentRoomId ? (
          <>
            <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0', fontWeight: '600', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></div>
              {/* 상단 이름: roomId 대신 유저 ID 표시 */}
              {/* 만약 roomOwnerId가 admin이면 'User'라고 표시, 아니면 ID 표시 */}
              User {roomOwnerId === ADMIN_ID ? "" : roomOwnerId} 
            </div>

            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f8f9fa' }}>
              {messages.map((msg, idx) => {
                const msgSender = msg.sender || msg.senderId;
                const isAdmin = String(msgSender) === ADMIN_ID;

                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: isAdmin ? 'flex-end' : 'flex-start' }}>
                    <span style={{ fontSize: '11px', color: '#999', marginBottom: '4px', padding: '0 4px' }}>
                      {isAdmin ? 'Admin' : `User ${msgSender}`}
                    </span>
                    <div style={{
                      maxWidth: '70%', padding: '10px 14px',
                      borderRadius: isAdmin ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      backgroundColor: isAdmin ? '#4A90E2' : '#fff',
                      color: isAdmin ? '#fff' : '#333',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      fontSize: '14px', lineHeight: '1.5', wordBreak: 'break-word'
                    }}>
                      {msg.message}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: '20px', borderTop: '1px solid #f0f0f0', backgroundColor: '#fff' }}>
              <div style={{ display: 'flex', gap: '10px', backgroundColor: '#f0f2f5', padding: '10px', borderRadius: '24px' }}>
                <input value={input} onChange={(e) => setInput(e.target.value)} style={{ flex: 1, border: 'none', background: 'transparent', padding: '8px', outline: 'none', fontSize: '14px' }} placeholder="메시지를 입력하세요..." onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
                <button onClick={sendMessage} style={{ padding: '8px 20px', background: '#4A90E2', color: 'white', border: 'none', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>전송</button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#adb5bd', gap: '10px' }}>
            <div style={{ fontSize: '48px' }}>💬</div>
            <div>좌측 목록에서 대화할 상대를 선택해주세요.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminChatPage;