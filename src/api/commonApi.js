import axios from "axios";
const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/api/availableTimes`;

export const getAvailableTime = async (spaceId, date) => {
  var str = `${host}`;
  const res = await axios.get(str, {
    params: {
      spaceId: spaceId,
      date: date,
    },
  });
  console.log("backend로부터 온데이터 ", res.data);
  return res.data;
};

export const getAvailableSpace = async (id, data) => {
  const res = await axios.post(
    `http://localhost:8080/api/availableSpace/${id}`,
    data
  );
  console.log("backend로부터 온데이터 ", res.data);
  return res.data;
};

export const getTime = async (request) => {
  const res = await axios.post(`http://localhost:8080/api/getTime`, request);
  console.log("backend로부터 온데이터 ", res.data);
  return res.data;
};
