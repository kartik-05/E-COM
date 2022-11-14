import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WishlistCard from "./WishlistCard/WishlistCard";
import Nothing from "../Nothing/Nothing";
import "./Wishlist.css";

function Wishlist() {
  let navigate = useNavigate();

  const userWishlist = useSelector(
    (state) => state?.Auth?.authData?.result?.wishlist
  );
  const getProducts = useSelector((state) => state?.Products?.products);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (getProducts) {
      setProducts(getProducts);
    }
  }, [getProducts, userWishlist]);

  return (
    <div className="myproducts-container">
      <div className="sub-nav">
        <button className="back" onClick={() => navigate(-1)}>
          &lt; BACK
        </button>
        <div>Wishlist</div>
      </div>
      {!userWishlist || userWishlist.length === 0 ? (
        <Nothing />
      ) : (
        <div className="wishlist-cards">
          {products === null ? (
            <Nothing />
          ) : (
            products?.map((product) => {
              const getIndex = userWishlist?.find(
                (id) => id === product.postId
              );
              if (getIndex) {
                return <WishlistCard key={product.postId} product={product} />;
              }
              return "";
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
