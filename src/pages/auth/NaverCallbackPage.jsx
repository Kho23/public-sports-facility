import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { socialLoginSuccess } from "../../store/auth/authSlice";
import axios from "axios";

const NaverCallbackPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (state !== "naver") {
      alert("비정상 접근");
      navigate("/auth/login");
      return;
    }

    if (!code) {
      alert("네이버 로그인 실패");
      navigate("/auth/login");
      return;
    }

    const naverLogin = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/naver/login",
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

        console.log("NAVER LOGIN RESPONSE 👉", res);

        localStorage.setItem("accessToken", res.data.accessToken);
        alert("네이버 로그인 성공");
        navigate("/");
      } catch (e) {
        console.error("NAVER LOGIN ERROR 👉", e);

        if (e.response) {
          console.error("STATUS:", e.response.status);
          console.error("DATA:", e.response.data);
        }

        alert("네이버 로그인 처리 중 오류");
        navigate("/auth/login");
      }
    };

    naverLogin();
  }, []);

  return <div className="p-10 text-center">네이버 로그인 처리 중...</div>;
};

export default NaverCallbackPage;
