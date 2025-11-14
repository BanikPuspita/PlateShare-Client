
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
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export const getAvailableFoods = () => requestJSON("/api/foods");
export const getFeaturedFoods = () => requestJSON("/api/foods/featured");
export const getFoodById = (id) => requestJSON(`/api/foods/${id}`);
export const addFood = (data) => requestJSON("/api/foods", { method: "POST", body: JSON.stringify(data) });
export const updateFood = (id, data) => requestJSON(`/api/foods/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteFood = (id) => requestJSON(`/api/foods/${id}`, { method: "DELETE" });
export const getMyFoods = () => requestJSON("/api/foods/my/foods");