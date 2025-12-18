const KAKAO_REST_KEY = process.env.REACT_APP_KAKAO_REST_KEY;
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;

const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

const SocialLogin = () => {
  const kakaoLoginHandler = () => {
    window.location.href =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${KAKAO_REST_KEY}` +
      `&redirect_uri=${REDIRECT_URI}` +
      `&response_type=code`;
  };

  const naverLoginHandler = () => {
    window.location.href =
      `https://nid.naver.com/oauth2.0/authorize` +
      `?response_type=code` +
      `&client_id=${NAVER_CLIENT_ID}` +
      `&redirect_uri=${REDIRECT_URI}` +
      `&state=naver`;
  };

  return { kakaoLoginHandler, naverLoginHandler };
};

export default SocialLogin;
