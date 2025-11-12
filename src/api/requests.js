import axios from "axios";

const API_URL = "http://localhost:5000/api/requests";

export const requestFood = async (requestData) => {
  const token = localStorage.getItem("access-token"); 
  const res = await axios.post(API_URL, requestData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
