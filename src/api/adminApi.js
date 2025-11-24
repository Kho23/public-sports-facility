import axios from "axios";
const API_SERVER_HOST = "http://localhost:8080/api";

export const programModify = async (programId, data) => {
  console.log("주소확인", programId);
  var str = `${API_SERVER_HOST}/program/${programId}`;
  const res = await axios.put(str, data);
  console.log("backend로부터 온데이터 ", res.data);
  return res.data;
};

export const modifyNotice = async (notice) => {
  console.log("notice!!!!!!!!!", notice);
  const res = await axios.put(
    `${API_SERVER_HOST}/notice/${notice.noticeId}`,
    notice
  );
  console.log("백엔드에 보내는 notice 수정데이터 ", res.notice);
  return res.data;
};

export const deleteNotice = async (id) => {
  const res = await axios.delete(`${API_SERVER_HOST}/notice/${id}`);
  console.log("삭제 데이터 ", res);
  return res.data;
};
export const registerNotice = async (notice) => {
  const res = await axios.post(`${API_SERVER_HOST}/notice/register`, notice);
  console.log("백엔드에 보낸 notice 등록 데이터", res.data);
  return res.data;
};
export const getListPartnerRequest = async () => {
  const res = await axios.get(`${API_SERVER_HOST}/member/partnerRequest`);
  console.log("백엔드에 보낸 partnerRequest 전체데이터", res.data);
  return res.data;
};
export const getOnePartnerRequest = async (RequestId) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/member/partnerRequest/${RequestId}`
  );
  console.log("백엔드에 보낸 partnerRequest 상세 데이터", res.data);
  return res.data;
};
export const changePartnerStatus = async (RequestId, status) => {
  const res = await axios.post(
    `${API_SERVER_HOST}/member/partnerRequest/${RequestId}`,
    status,
    {
      headers: {
        "Content-Type": "application/json",
      },
      transformRequest: [(data) => JSON.stringify(data)],
    }
  );
  return res.data;
};
export const getAllListSupport = async () => {
  const res = await axios.get(`${API_SERVER_HOST}/member/support`);
  console.log("백엔드에 보낸 support 전체데이터", res.data);
  return res.data;
};
export const registerSupportResponse = async (no, response) => {
  const res = await axios.post(
    `${API_SERVER_HOST}/member/support/${no}`,
    response
  );
  console.log("백엔드에 보낸 Response 데이터", res.data);
  return res.data;
};
export const updateFaq = async (id, data) => {
  const res = await axios.put(`${API_SERVER_HOST}/faq/${id}`, data);
  console.log("백엔드에 보낸 faq 수정데이터", res.data);
  return res.data;
};
export const deleteFaq = async (id) => {
  const res = await axios.delete(`${API_SERVER_HOST}/faq/${id}`);
  console.log("백엔드에 보낸 faq 삭제데이터", res.data);
  return res.data;
};
export const createFaq = async (data) => {
  const res = await axios.post(`${API_SERVER_HOST}/faq/register`, data);
  console.log("백엔드에 보낸 faq 추가데이터", res.data);
  return res.data;
};
