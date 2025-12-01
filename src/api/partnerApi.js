import axios from "axios";

export const getPartnerStatus = async () => {
  const res = await axios.get(
    `http://localhost:8080/api/partner/partnerRequest`
  );
  return res.data;
}; // 파트너 신청서 제출 상태 확인

export const lessonRequest = async (form) => {
  const res = await axios.post(
    `http://localhost:8080/api/lesson/lessonRequest`,
    form
  );
  return res.data;
}; // 강좌 개설 신청 폼 제출
