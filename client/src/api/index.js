import axios from "axios";

const API = axios.create({ baseURL: "https://gameonproject.herokuapp.com/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getGamePost = () => API.get("/products");
export const createGamePost = (newPost) =>
  API.post(`/products/create`, newPost);

export const updateGameDetails = (id, data) =>
  API.patch(`/products/UpdateGameDetails/${id}`, data);

export const updateProductImage = (data) =>
  API.patch(`/products/updateimage`, data);

export const deletePost = (id) => API.delete(`/products/delete/${id}`);

export const signin = (formData) => API.post("/auth/signin", formData);
export const signup = (formData) => API.post("/auth/signup", formData);
export const wishlist = (data) => API.post("/auth/wishlist", data);
export const cart = (data) => API.post("/auth/cart", data);
