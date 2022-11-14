import * as api from "../api/index";

export const getGamePosts = () => async (dispatch) => {
  try {
    const data = await api.getGamePost();
    dispatch({ type: "get", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = (GamePost, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createGamePost(GamePost);
    dispatch({ type: "create", payload: data });
    navigate(`/sell/${data.category}/${data.postId}`, { replace: true });
  } catch (error) {
    console.log(error);
  }
};

export const updateProductDetails = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateGameDetails(id, updateData);
    dispatch({ type: "update", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProductImage = (updData) => async (dispatch) => {
  try {
    const { data } = await api.updateProductImage(updData);

    dispatch({ type: "update", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (product) => async (dispatch) => {
  try {
    await api.deletePost(product.postId);

    dispatch({ type: "delete", payload: product.postId });
  } catch (error) {
    console.log(error);
  }
};
