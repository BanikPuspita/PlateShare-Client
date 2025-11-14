// src/api/foods.js
import { getAuth } from "firebase/auth";

const API_BASE = import.meta.env.VITE_API_BASE;

async function getToken() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch (err) {
    console.error("Token error:", err);
    return null;
  }
}

async function requestJSON(url, options = {}) {
  const token = await getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  console.log(`API Call: ${API_BASE}${url}`, { method: options.method || "GET", token: token ? "YES" : "NO" }); // DEBUG

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("API Error:", res.status, text);
    throw new Error(text || res.statusText);
  }

  return res.json();
}

// PUBLIC ENDPOINTS (NO TOKEN NEEDED)
export const getAvailableFoods = () => requestJSON("/api/foods");
export const getFeaturedFoods = () => requestJSON("/api/foods/featured");

// PROTECTED ENDPOINTS (TOKEN SENT AUTOMATICALLY)
export const getFoodById = (id) => requestJSON(`/api/foods/${id}`);
export const addFood = (data) =>
  requestJSON("/api/foods", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateFood = (id, data) =>
  requestJSON(`/api/foods/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteFood = (id) =>
  requestJSON(`/api/foods/${id}`, { method: "DELETE" });
export const getMyFoods = () => requestJSON("/api/foods/my/foods");