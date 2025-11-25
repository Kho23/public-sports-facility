import axios from "axios";

export const getPartnerStatus = async () => {
  const res = await axios.get(
    `http://localhost:8080/api/partner/partnerRequest`
  );
  return res.data;
}; // 파트너 신청서 제출 상태 확인
