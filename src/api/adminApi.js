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
    `${API_SERVER_HOST}/community/notice/admin/${notice.noticeId}`,
    notice
  );
  console.log("백엔드에 보내는 notice 수정데이터 ", res.notice);
  return res.data;
};

export const deleteNotice = async (no) => {
  const res = await axios.delete(
    `${API_SERVER_HOST}/community/notice/admin/${no}`
  );
  console.log("삭제 데이터 ", res);
  return res.data;
};
export const registerNotice = async (notice) => {
  const res = await axios.post(
    `${API_SERVER_HOST}/community/notice/admin/register`,
    notice
  );
  console.log("백엔드에 보낸 notice 등록 데이터", res.data);
  return res.data;
};
export const getListPartnerRequest = async () => {
  const res = await axios.get(`${API_SERVER_HOST}/partner/partnerRequest`);
  console.log("백엔드에 보낸 partnerRequest 전체데이터", res.data);
  return res.data;
};
export const getOnePartnerRequest = async (RequestId) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/partner/partnerRequest/${RequestId}`
  );
  console.log("백엔드에 보낸 partnerRequest 상세 데이터", res.data);
  return res.data;
};
export const changePartnerStatus = async (RequestId, status) => {
  const res = await axios.post(
    `${API_SERVER_HOST}/partner/partnerRequest/status/${RequestId}`,
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
  const res = await axios.get(`${API_SERVER_HOST}/support/all`);
  console.log("백엔드에 보낸 support 전체데이터", res.data);
  return res.data;
};
export const registerSupportResponse = async (no, response) => {
  const res = await axios.post(`${API_SERVER_HOST}/support/${no}`, response);
  console.log("백엔드에 보낸 Response 데이터", res.data);
  return res.data;
};
export const updateFaq = async (no, data) => {
  const res = await axios.put(
    `${API_SERVER_HOST}/community/faq/admin/${no}`,
    data
  );
  console.log("백엔드에 보낸 faq 수정데이터", res.data);
  return res.data;
};
export const deleteFaq = async (no) => {
  const res = await axios.delete(
    `${API_SERVER_HOST}/community/faq/admin/${no}`
  );
  console.log("백엔드에 보낸 faq 삭제데이터", res.data);
  return res.data;
};
export const createFaq = async (data) => {
  const res = await axios.post(
    `${API_SERVER_HOST}/community/faq/admin/register`,
    data
  );
  console.log("백엔드에 보낸 faq 추가데이터", res.data);
  return res.data;
};
export const getScheduleList = async () => {
  const res = await axios.get(`${API_SERVER_HOST}/community/schedule/admin`);
  console.log("백엔드에 보낸 schedule 전체데이터", res.data);
  return res.data;
};
export const createSchedule = async (data) => {
  const res = await axios.post(
    `${API_SERVER_HOST}/community/schedule/admin/register`,
    data
  );
  console.log("백엔드에 보낸 schedule 생성데이터", res.data);
  return res.data;
};
export const updateSchedule = async (no, data) => {
  const res = await axios.put(
    `${API_SERVER_HOST}/community/schedule/admin/${no}`,
    data
  );
  console.log("백엔드에 보낸 schedule 수정데이터", res.data);
  return res.data;
};
export const deleteSchedule = async (no) => {
  const res = await axios.delete(
    `${API_SERVER_HOST}/community/schedule/admin/${no}`
  );
  console.log("백엔드에 보낸 schedule 삭제데이터", res.data);
  return res.data;
};
