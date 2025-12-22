const KAKAO_REST_KEY = process.env.REACT_APP_KAKAO_REST_KEY;
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const KAKAO_REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
const NAVER_REDIRECT_URI = "http://localhost:3000/auth/naver/callback";
const GOOGLE_REDIRECT_URI = "http://localhost:3000/auth/google/callback";

const SocialLogin = () => {
  const kakaoLoginHandler = () => {
    window.location.href =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${KAKAO_REST_KEY}` +
      `&redirect_uri=${KAKAO_REDIRECT_URI}` +
      `&response_type=code`;
  };

  const naverLoginHandler = () => {
    window.location.href =
      `https://nid.naver.com/oauth2.0/authorize` +
      `?response_type=code` +
      `&client_id=${NAVER_CLIENT_ID}` +
      `&redirect_uri=${NAVER_REDIRECT_URI}` +
      `&state=naver`;
  };

  const googleLoginHandler = () => {
    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${GOOGLE_REDIRECT_URI}` +
      `&response_type=code` +
      `&scope=openid email profile`;
  };

  return { kakaoLoginHandler, naverLoginHandler, googleLoginHandler };
};

export default SocialLogin;
