import axios from "axios";

export const getOne = async (id) => {
  const res = await axios.get(
    `http://localhost:8080/api/member/${id}/memberEdit`
  );
  return res.data;
};

export const register = async (id, userData) => {
  const res = await axios.post(
    `http://localhost:8080/api/member/${id}/memberEdit`,
    userData
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
