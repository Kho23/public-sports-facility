import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "../src/store/store";
import { CookiesProvider } from "react-cookie";
import React from "react";
import { getCookie } from "./util/cookieUtil";
import axios from "axios";
import { logout } from "./store/auth/authSlice";

//모든 axios 요청에 interceptor 를 설정하여 백엔드에 요청 시 이 요청을 가로채고
//헤더에 Authorization 을, 그 안에는 Bearer + 토큰 을 담아서 보내준다
axios.defaults.baseURL = "http://localhost:8080"; //기본 URL 을 설정하여 모든 백엔드 요청을 가로채도록 함
axios.defaults.headers.common["Content-Type"] = "application/json"; //기본 헤더는 Content-Type:application.json 으로 설정
axios.interceptors.request.use(
  //인터셉터가 가로챈 요청을 수정함
  (config) => {
    const cookie = getCookie("member");
    if (cookie && cookie.accessToken) {
      //쿠키와 쿠키 속 토큰이 모두 있다면
      config.headers["Authorization"] = `Bearer ${cookie.accessToken}`;
      //백엔드에서 기대하는 형태로 헤더를 만들어준다
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
    //백엔드에 config를 담아서 보내준다
  },
  (error) => {
    return Promise.reject(error);
    //에러 발생 시 Promise 객체에 에러 설정
  }
);
//index.js 파일에 인터셉터를 설정하여 전역으로 axios 을 인터셉터가 가로채고 쿠키를 백엔드에서 기대하는 형태, JWT 에 맞게 보내줌
axios.interceptors.response.use(
  //백엔드에서 반환해준 데이터를 가로챔
  (res) => {
    return res;
    //토큰이 유효하면 그대로 통과
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      //토큰 만료 시 401 에러 발생하여 이를 감지하면
      console.log("토큰이 만료되어 로그아웃됩니다.");
      store.dispatch(logout());
      //로그아웃 함수 실행하여 쿠키 제거
      alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/auth/login";
      //index.js 는 리액트 컴포넌트의 생명주기 밖에 있어 훅 사용이 불가
      //그래서 위 코드로 로그인 페이지로 이동하도록 함
    }
    return Promise.reject(error);
  }
);
//토큰 만료 시 실행되는 인터셉터
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>
  // </React.StrictMode> 이건 예민하게 검사하는 모드라 임시로 주석처리
);
