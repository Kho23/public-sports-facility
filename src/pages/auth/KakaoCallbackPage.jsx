import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { socialLoginSuccess } from "../../store/auth/authSlice";
import axios from "axios";

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      alert("카카오 로그인 실패");
      navigate("/auth/login");
      return;
    }

    const kakaoLogin = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/kakao/login",
          {
            code,
          }
        );

        dispatch(
          socialLoginSuccess({
            accessToken: res.data.accessToken,
            memberRole: res.data.memberRole,
            loginId: res.data.loginId,
          })
        );

        console.log("KAKAO LOGIN RESPONSE 👉", res);

        localStorage.setItem("accessToken", res.data.accessToken);
        alert("카카오 로그인 성공");
        navigate("/");
      } catch (e) {
        console.error("KAKAO LOGIN ERROR 👉", e);

        if (e.response) {
          console.error("STATUS:", e.response.status);
          console.error("DATA:", e.response.data);
        }

        alert("카카오 로그인 처리 중 오류");
        navigate("/auth/login");
      }
    };

    kakaoLogin();
  }, []);

  return <div className="p-10 text-center">카카오 로그인 처리 중...</div>;
};

export default KakaoCallbackPage;
