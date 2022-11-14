import React, { useEffect, useState } from "react";
import "./ProductInfoCard.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { wishlist, cart } from "../../../actions/Auth";
import { useNavigate } from "react-router-dom";
const buttonStylesCart = {
  border: "2px solid black",
  color: "black",
  marginTop: "10px",
  padding: "10px 0px",
  fontWeight: "bold",
};
const buttonStylesWishlist = {
  border: "2px solid black",
  color: "black",
  marginTop: "10px",
  padding: "5px 0px",
  fontSize: "0.7rem",
  fontWeight: "bold",
};

function ProdutctInfoCard({ product }) {
  const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const buttonStylesBuyNow = {
    backgroundColor: product.themeColor,
    border: `2px solid ${product.themeColor}`,
    color: "black",
    fontWeight: "bold",
    marginTop: "10px",
    padding: "10px 0px",
  };
  const user = useSelector((state) => state?.Auth?.authData?.result);
  const [userEmail, setUserEmail] = useState(null);
  const [wishlistArr, setWishlist] = useState([]);
  const [cartArr, setCart] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleWishlist = () => {
    if (!userEmail) {
      alert("Log in to wishlist products!");
      return;
    }
    dispatch(wishlist({ postId: product.postId, email: userEmail }));
  };

  const handleAddToCart = () => {
    if (!userEmail) {
      alert("Log in to Add items to Cart!");
      return;
    }
    dispatch(cart({ postId: product.postId, email: userEmail }));
  };

  useEffect(() => {
    if (user) {
      setUserEmail((prev) => user.email);
      setWishlist((prev) => user.wishlist);
      setCart((prev) => user.cart);
    }
  }, [user]);

  return (
    <div className="product-info-card-container">
      <div className="product-info-card-container-image">
        <img src={product.logo} alt="" />
      </div>
      <div className="product-info-card-price">
        &#8377; {addCommas(product.price)}
      </div>
      <Button
        className="product-info-buy-now-button"
        style={buttonStylesBuyNow}
        onClick={() => navigate("/BuyNow")}
      >
        BUY NOW
      </Button>
      <Button
        variant="outlined"
        className="product-info-add-to-cart-button"
        style={buttonStylesCart}
        onClick={handleAddToCart}
      >
        {cartArr.find((id) => id === product.postId)
          ? "Remove From Cart"
          : "Add to Cart"}
      </Button>
      <Button
        className="product-info-add-to-wishlist-button"
        style={buttonStylesWishlist}
        onClick={handleWishlist}
      >
        {wishlistArr.find((id) => id === product.postId)
          ? "Remove From Wishlist"
          : "Add to Wishlist"}
      </Button>
      <div className="product-info-seller-info">
        <b>Sold By:</b> {product.username}
      </div>
      <div className="product-info-seller-info border_top_bottom">
        <b>Brand:</b> {product.brand}
      </div>
    </div>
  );
}

export default ProdutctInfoCard;
