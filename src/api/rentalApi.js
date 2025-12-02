import axios from "axios";

export const lessonRequest = async (form) => {
  const res = await axios.post(
    `http://localhost:8080/api/reservation/rental`,
    form
  );
  return res.data;
}; // 대관 신청 예약 폼 제출
