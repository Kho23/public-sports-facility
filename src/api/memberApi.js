import axios from "axios";

// const getAuthHeader = () => {
//   const cookie = getCookie("member")
//   console.log("쿠키는",cookie)
//   if (!cookie) throw new Error("로그인 정보 없음")
//   const accessToken = cookie.accessToken;
//   if(!accessToken) throw new Error("토큰이 쿠키에 없음")
//   return {
//     'Authorization':`Bearer ${accessToken}`
//   }
// }
//인터셉터 처리로 더이상 필요없는 코드

export const getOne = async () => {
  const res = await axios.get(
    `http://localhost:8080/api/member/memberEdit`
  );
  return res.data;
};

export const modify = async (userData) => {
  const res = await axios.put(
    `http://localhost:8080/api/member/memberEdit`,
    userData
  );
  console.log("수정완료 변경할 멤버정보=", userData)
  return res.data;
};

export const changePassword = async (id, data) => {
  const res = await axios.post(
    `http://localhost:8080/api/member/${id}/passwordEdit`,
    data
  );
  return res.data;
};

export const partnerReqFileRegister = async (id, formData) => {
  const res = await axios.post(
    `http://localhost:8080/api/member/${id}/partnerRequest`,
    formData
  );
  return res.data;
};

export const supportReqRegister = async (id, formData) => {
  const res = await axios.post(
    `http://localhost:8080/api/member/${id}/support/write`,
    formData
  );
  return res.data;
};

export const supportGetList = async (id) => {
  const res = await axios.get(`http://localhost:8080/api/member/${id}/support`);
  return res.data;
};

export const supportGetOne = async (no) => {
  const res = await axios.get(`http://localhost:8080/api/member/support/${no}`);
  return res.data;
};
