// import axios from "axios";

// const API_BASE = "http://localhost:5000/api/foods";

// export const getAvailableFoods = async() => {
//     const res = await axios.get(`${API_BASE}`);
//     return res.data;
// }

// export const getFeaturedFoods = async() => {
//     const res = await axios.get(`${API_BASE}/featured`)
//     return res.data
// }

// export const getFoodById = async (id) => {
//   const res = await axios.get(`${API_BASE}/${id}`);
//   return res.data;
// };



// src/api/foods.js
import { getAuth } from "firebase/auth";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000"; // set env var if needed

async function getToken() {
  const auth = getAuth();
  const current = auth.currentUser;
  if (!current) return null;
  return await current.getIdToken(/* forceRefresh */ true);
}

async function requestJSON(url, options = {}) {
  const token = await getToken();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${text}`);
  }
  return res.json();
}

/* Foods API */
export const getAvailableFoods = () => requestJSON(`/api/foods`);
export const getFeaturedFoods = () => requestJSON(`/api/foods/featured`);
export const getFoodById = (id) => requestJSON(`/api/foods/${id}`);
export const addFood = (data) =>
  requestJSON(`/api/foods`, { method: "POST", body: JSON.stringify(data) });
export const updateFood = (id, data) =>
  requestJSON(`/api/foods/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteFood = (id) =>
  requestJSON(`/api/foods/${id}`, { method: "DELETE" });

export default {
  getAvailableFoods,
  getFeaturedFoods,
  getFoodById,
  addFood,
  updateFood,
  deleteFood,
};
