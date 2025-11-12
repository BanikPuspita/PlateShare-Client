import axios from "axios";

const API_BASE = "http://localhost:5000/api/foods";

export const getAvailableFoods = async() => {
    const res = await axios.get(`${API_BASE}`);
    return res.data;
}

export const getFeaturedFoods = async() => {
    const res = await axios.get(`${API_BASE}/featured`)
    return res.data
}

export const getFoodById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};