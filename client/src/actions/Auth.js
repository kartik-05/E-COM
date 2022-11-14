import * as api from "../api/index";
import toast from "react-hot-toast";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: "auth", payload: data });
    navigate("/", { replace: true });

    toast(`Welcome Back ${data.result.name}`, {
      icon: "👋",
    });
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: "auth", payload: data });
    navigate("/", { replace: true });
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const wishlist = (wishlistData) => async (dispatch) => {
  try {
    const { data } = await api.wishlist(wishlistData);
    dispatch({ type: "wishlist", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const cart = (cartData) => async (dispatch) => {
  try {
    const { data } = await api.cart(cartData);
    dispatch({ type: "cart", payload: data });
  } catch (error) {
    console.log(error);
  }
};
