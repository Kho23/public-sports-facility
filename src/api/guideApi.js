import axios from "axios";

export const upload = async (formData) => {
  const res = await axios.post(
    `http://localhost:8080/api/guide/upload`,
    formData
  );
  return res.data;
};

export const getCategory = async (category) => {
  const res = await axios.get(`http://localhost:8080/api/guide/${category}`);
  return res.data;
};

export const getView = async (fileName) => {
  const res = await axios.get(`http://localhost:8080/api/view/${fileName}"`);
  return res.data;
};
