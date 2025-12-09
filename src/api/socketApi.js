import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// 웹소켓 엔드포인트
const WS_URL = "http://localhost:8080/ws-chat";

// 1. 소켓 연결 함수
// 인자: (참조객체, 방번호, 토큰, 메시지받으면실행할함수)
export const connectSocket = (clientRef, roomId, token, onMessageReceived) => {
    const socket = new SockJS(WS_URL);
    clientRef.current = Stomp.over(socket);

    // clientRef.current.debug = () => {}; // 로그 끄기 (선택)

    clientRef.current.connect(
        { Authorization: `Bearer ${token}` },
        () => {
            console.log(`[Socket] ${roomId}번 방 연결 성공`);
            
            // 구독 설정
            clientRef.current.subscribe(
                `/sub/chat/room/${roomId}`, 
                (message) => {
                    const received = JSON.parse(message.body);
                    // ★ 컴포넌트에서 전달받은 콜백 함수 실행 (화면 갱신용)
                    onMessageReceived(received); 
                }
            );
        },
        (err) => {
            console.error("[Socket] 연결 에러:", err);
        }
    );
};

// 2. 연결 해제 함수
export const disconnectSocket = (clientRef) => {
    if (clientRef.current) {
        clientRef.current.disconnect();
        console.log("[Socket] 연결 해제");
    }
};

// 3. 메시지 전송 함수
export const publishMessage = (clientRef, roomId, message) => {
    if (!clientRef.current || !clientRef.current.connected) {
        console.log("[Socket] 연결되지 않아 전송 실패");
        return;
    }

    const msg = {
        roomId: roomId,
        message: message
    };

    clientRef.current.send("/pub/chat/message", {}, JSON.stringify(msg));
};