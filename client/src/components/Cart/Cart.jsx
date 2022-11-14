import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartCard from "./CartCard/CartCard";
import Nothing from "../Nothing/Nothing";
import { Button } from "@mui/material";
import "./Cart.css";

const checkoutButtonStyles = {
  background: "#ff4500",
  color: "white",
};

function Cart() {
  let navigate = useNavigate();

  const userCart = useSelector((state) => state?.Auth?.authData?.result?.cart);
  const getProducts = useSelector((state) => state?.Products?.products);
  const [products, setProducts] = useState([]);
  // const [total, setTotal] = useState(0);

  useEffect(() => {
    if (getProducts) {
      setProducts(getProducts);
    }
    // userCart?.map((id) => {
    //   products.map((product) => {
    //     if (product.postId === id) {
    //       setTotal((prev) => {
    //         return prev + product.price;
    //       });
    //     }
    //   });
    // });
  }, [getProducts, userCart]);

  return (
    <div className="cart-container">
      <div className="sub-nav">
        <button className="back" onClick={() => navigate(-1)}>
          &lt; BACK
        </button>
        <div>Cart</div>
      </div>
      {!userCart || userCart.length === 0 ? (
        <Nothing />
      ) : (
        <>
          <div className="wishlist-cards">
            {products?.map((product) => {
              const getIndex = userCart?.find((id) => id === product.postId);
              if (getIndex) {
                return <CartCard key={product.postId} product={product} />;
              }
            })}
          </div>
          <div className="cart-checkout-container">
            {/* <div className="cart-checkout-total"> */}
            {/* TOTAL:<b>{total}</b> */}
            {/* </div> */}
            <Button
              variant="contained"
              size="small"
              style={checkoutButtonStyles}
              onClick={() => navigate("/BuyNow")}
            >
              Checkout Now!
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
