import axios from "axios";

const API_HOST_URL = "http://localhost:8080/api/community/gallery";

export const register = async (dto) => {
  const res = await axios.post(`${API_HOST_URL}/admin`, dto);
  return res.data;
};

export const fileRegister = async (file) => {
  const formData = new FormData();
  //FormData 객체 생성, axios 에서 FormData 로 post 하면 자동으로 Content-Type 이 multipart/form-data로 설정된다
  formData.append("file", file);
  const res = await axios.post(`http://localhost:8080/api/upload/gallery`, formData);
  return res.data;
};

export const getGalleryList = async () => {
  const res = await axios.get(`${API_HOST_URL}`);
  console.log("백엔드 갤러리 데이터=", res.data);
  return res.data;
};

export const getOneGallery = async (no) => {
  const res = await axios.get(`${API_HOST_URL}/${no}`);
  return res.data;
};

export const increaseViewCount = async (no) => {
  const res = await axios.post(`${API_HOST_URL}/${no}/view`);
  return res.data;
};

export const updateGallery = async (id, dto) => {
  const res = await axios.put(`${API_HOST_URL}/admin/update`)
  console.log("수정된 데이터=", res.data)
  return res.data
}

export const deleteGallery = async(id) => {
  const res = await axios.delete(`${API_HOST_URL}/admin/${id}`)
  console.log("갤러리 삭제 완료")
  return res.data
}
