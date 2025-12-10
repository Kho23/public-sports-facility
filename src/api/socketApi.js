import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const WS_URL = "http://localhost:8080/ws-chat";

// 1. 소켓 연결 함수
export const connectSocket = (clientRef, token, onConnect) => {
    const socket = new SockJS(WS_URL);
    clientRef.current = Stomp.over(socket);

    // 디버그 로그 끄기 (선택)
    // clientRef.current.debug = () => {}; 

    clientRef.current.connect(
        { Authorization: `Bearer ${token}` },
        () => {
            console.log(`[Socket] 연결 성공`);
            if (onConnect) onConnect();
        },
        (err) => {
            console.error("[Socket] 연결 에러:", err);
        }
    );
};

// 2. 구독 함수
export const subscribeRoom = (clientRef, roomId, callback) => {
    if (!clientRef.current || !clientRef.current.connected) return;
    
    return clientRef.current.subscribe(
        `/sub/chat/room/${roomId}`,
        (message) => {
            const received = JSON.parse(message.body);
            callback(received);
        }
    );
};

// 3. 연결 해제 함수
export const disconnectSocket = (clientRef) => {
    if (clientRef.current) {
        clientRef.current.disconnect();
        console.log("[Socket] 연결 해제");
    }
};

// 🔥 [중요 수정] 메시지 전송 함수
export const publishMessage = (clientRef, roomId, message) => {
    // 1. 클라이언트가 없거나(null), 연결이 안 되어(!connected) 있으면 '중단'해야 함
    if (!clientRef.current || !clientRef.current.connected) {
        console.log("[Socket] 전송 실패: 소켓이 연결되지 않았습니다.");
        return;
    }

    // 2. 연결된 상태일 때만 전송
    clientRef.current.send("/pub/chat/message", {}, JSON.stringify({
        roomId: roomId,
        message: message,
    }));
};