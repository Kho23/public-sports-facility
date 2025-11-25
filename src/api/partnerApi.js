import axios from "axios";

export const getPartnerStatus = async (id) => {
  const res = await axios.get(
    `http://localhost:8080/api/member/${id}/partnerRequest`
  );
  return res.data;
}; // 파트너 신청서 제출 상태 확인
