import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./WishlistCard.css";
import { useDispatch, useSelector } from "react-redux";
import { wishlist } from "../../../actions/Auth";
import { Link } from "react-router-dom";
import { cart } from "../../../actions/Auth";

const removeButtonStyles = {
  border: "2px solid #4169e1",
  color: "#4169e1",
  marginRight: "20px",
};
const addToCartButtonStyles = {
  border: "2px solid #4169e1",
  background: "#4169e1",
};

function WishlistCard({ product }) {
  const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const userEmail = JSON.parse(localStorage.getItem("profile"))?.result?.email;
  const dispatch = useDispatch();
  const [cartArr, setCart] = useState([]);
  const user = useSelector((state) => state?.Auth?.authData?.result);

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
      setCart((prev) => user.cart);
    }
  }, [user]);

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
            onClick={handleWishlist}
          >
            Remove
          </Button>
          <Button
            variant="contained"
            size="small"
            style={addToCartButtonStyles}
            onClick={handleAddToCart}
          >
            {cartArr.find((id) => id === product.postId)
              ? "Remove From Cart"
              : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
