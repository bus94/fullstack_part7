import { useEffect, useState } from 'react';
import './App.css';
import useWebSocket from 'react-use-websocket';
import { v4 as uuidv4 } from 'uuid'

const WEBSOCKET_URL = "wss://0lr8k5wgij.execute-api.ap-northeast-2.amazonaws.com/demo/";

function App() {
  const [socketUrl] = useState(WEBSOCKET_URL);
  // sendMessage 웹 소켓 서버로 메시지를 보내는 함수
  // 클라이언트가 서버에 데이터를 전송할 때 사용한다.
  // lastMessage: 서버에서 마지막으로 수신한 메시지 - 서버에서 메시지가 올 때마다 업데이트 된다.
  // readyState: 웹 소켓의 연결 상태를 나타내는 함수
  // 4가지  1) 0: 연결을 시도 중 (connecting) 2) 1: 연결됨 (open) 3) 2: 연결 종료 시도 중 (closing) 4) 3: 연결 종료 (closed)
  const {sendMessage, lastMessage, readyState} = useWebSocket(socketUrl);

  // 메시지를 저장하고 출력할 수 있는 변수
  const [message, setMessage] = useState('');

  // 고유한 사용자 아이디를 생성
  const [userId, setUserId] = useState(uuidv4());
  
  // 웹 소켓 연결 상태
  const connectionStatus = {
    0 : '연결 시도 중..',
    1 : '연결 되었음',
    2 : '연결 종료 시도 중..',
    3 : '연결 종료됨'
  }[readyState];

  // readyState 변경 될 때마다 함수를 실행한다.
  useEffect(() => {
    if(readyState === 1) {
      console.log("연결됨!");
    }
  }, [readyState]);

  const handlerSendMessage = () => {
    if(message) {
      // action 필드를 키로, sendMessage를 값으로 설정했기 때문에 아래와 같이 코드 작성
      sendMessage(JSON.stringify({ action : 'sendMessage', message }));

      // 메시지 전송 후 입력 필드 비우기
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h1>WebSocket 연결 테스트</h1>
      <p>WebSocket 상태: {readyState === 1 ? "연결성공~" : "연결실패~" }</p>
      <p>사용자 ID: {userId} </p>
      <p>마지막 메시지: {lastMessage ? lastMessage.data : "메시지 없음"}</p>
      <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='메시지를 입력하세요' />
      {/* 웹 소켓이 연결되지 않았으면 버튼을 비활성화! 만약 웹 소켓이 연결 되었으면 활성화 하는 코드 
        disabled={readyState !== 1}
      */}
      <button onClick={handlerSendMessage} disabled={readyState !== 1}>전송</button>
    </div>
  );
}

export default App;