import axios from "axios";

const API_HOST_URL = "http://localhost:8080/api/upload";

export const fileRegister = async (formData, domain) => {
  const res = await axios.post(`${API_HOST_URL}/${domain}`, formData);
  return res.data;
};
