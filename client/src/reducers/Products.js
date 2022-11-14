export default (state = { products: [] }, action) => {
  switch (action.type) {
    case "get":
      return { products: action.payload.data };
    case "create":
      const createArr = [...state.products, action.payload];
      return { products: createArr };
    case "update":
      const arr = state.products?.map((product) =>
        product.postId === action.payload.postId ? action.payload : product
      );
      return { products: arr };
    case "delete":
      const delArr = state.products?.filter(
        (product) => product.postId !== action.payload
      );
      return { products: delArr };
    default:
      return state;
  }
};
