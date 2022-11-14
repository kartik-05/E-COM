import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { cart } from "../../../actions/Auth";
import { Link } from "react-router-dom";

const removeButtonStyles = {
  border: "2px solid #4169e1",
  color: "#4169e1",
};

function CartCard({ product }) {
  const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const userEmail = JSON.parse(localStorage.getItem("profile"))?.result?.email;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!userEmail) {
      alert("Log in to Add items to Cart!");
      return;
    }
    dispatch(cart({ postId: product.postId, email: userEmail }));
  };

  return (
    <div className="wishlist-card-container">
      <div className="wishlist-card-image">
        <Link to={`/product/${product.postId}`}>
          <img src={product.thumbnail} alt="" />
        </Link>
      </div>
      <div className="wishlist-card-content">
        <div className="originals-tag-container">
          <div className="product-card-originals">{product?.category}</div>
        </div>
        <div className="wishlist-card-details">
          <div className="wishlist-card-name">{product.name}</div>
          <div className="wishlist-card-price">
            &#8377; {addCommas(product.price)}
          </div>
        </div>
        <div className="wishlist-card-buttons">
          <Button
            variant="outlined"
            size="small"
            style={removeButtonStyles}
            onClick={handleAddToCart}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
