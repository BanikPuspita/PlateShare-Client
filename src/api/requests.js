// import axios from "axios";

// const API_URL = "http://localhost:5000/api/requests";

// export const requestFood = async (requestData) => {
//   const token = localStorage.getItem("access-token"); 
//   const res = await axios.post(API_URL, requestData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return res.data;
// };


// src/api/requests.js
import { getAuth } from "firebase/auth";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

async function getToken() {
  const auth = getAuth();
  const current = auth.currentUser;
  if (!current) return null;
  return await current.getIdToken(true);
}

async function requestJSON(url, options = {}) {
  const token = await getToken();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(await res.text());
  }
  return res.json();
}

/* Requests API */
export const requestFood = (data) =>
  requestJSON(`/api/requests`, { method: "POST", body: JSON.stringify(data) });

export const getMyRequests = () => requestJSON(`/api/requests/my`); // implement backend if needed
export const getRequestsForFood = (foodId) => requestJSON(`/api/requests/food/${foodId}`);
export const acceptRequest = (id) => requestJSON(`/api/requests/${id}/accept`, { method: "PUT" });
export const rejectRequest = (id) => requestJSON(`/api/requests/${id}/reject`, { method: "PUT" });
export default { requestFood, getMyRequests, getRequestsForFood, acceptRequest, rejectRequest };
