import axios from "axios";
const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/api`;

export const findByFacilityId = async (id) => {
  var str = `${host}/facilitySpace/${id}`;
  const res = await axios.get(str);
  console.log("backend로부터 온데이터 ", res.data);
  return res.data;
};

export const registerDailyUse = async (data) => {
  var str = `${host}/dailyUse`;
  const res = await axios.post(str, data);
  console.log("backend으로부터 온데이터 ", res.data);
  return res.data;
};
export const registerGymDailyUse = async (data) => {
  var str = `${host}/gymDailyUse`;
  const res = await axios.post(str, data);
  console.log("backend으로부터 온데이터 ", res.data);
  return res.data;
};
