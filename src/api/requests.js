// src/api/requests.js
import { getAuth } from "firebase/auth";

const API_BASE = import.meta.env.VITE_API_BASE;

async function getToken() {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? await user.getIdToken() : null;
}

async function requestJSON(url, options = {}) {
  const token = await getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  return res.json();
}

export const requestFood = (data) =>
  requestJSON("/api/requests", { method: "POST", body: JSON.stringify(data) });

export const getMyRequests = () => requestJSON("/api/requests/my");

export const getRequestsForFood = (foodId) =>
  requestJSON(`/api/requests/food/${foodId}`);

export const updateRequestStatus = (requestId, status) =>
  requestJSON(`/api/requests/${requestId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });