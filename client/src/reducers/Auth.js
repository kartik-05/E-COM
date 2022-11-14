const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "getUser":
      const user = JSON.parse(localStorage.getItem("profile"));
      return { ...state, authData: user };
    case "auth":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };

    case "logout":
      localStorage.clear();
      return { ...state, authData: null };

    case "wishlist":
      const userInfo = JSON.parse(localStorage.getItem("profile"));
      userInfo.result.wishlist = action?.payload;

      localStorage.setItem("profile", JSON.stringify(userInfo));

      return { ...state, authData: userInfo };
    case "cart":
      const userInfoCart = JSON.parse(localStorage.getItem("profile"));
      userInfoCart.result.cart = action?.payload;

      localStorage.setItem("profile", JSON.stringify(userInfoCart));

      return { ...state, authData: userInfoCart };
    default:
      return state;
  }
};

export default authReducer;
