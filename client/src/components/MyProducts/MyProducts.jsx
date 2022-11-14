import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./MyProducts.css";
import Nothing from "../Nothing/Nothing";

function MyProducts() {
  let navigate = useNavigate();
  const getProducts = useSelector((state) => state?.Products?.products);
  const findUser = JSON.parse(localStorage.getItem("profile"))?.result?.name;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (getProducts) {
      setProducts(getProducts);
    }
  }, [getProducts]);
  console.log(findUser);
  return (
    <div className="myproducts-container">
      <div className="sub-nav">
        <button className="back" onClick={() => navigate(-1)}>
          &lt; BACK
        </button>
        <div>My Products</div>
      </div>
      {!products || products.length === 0 ? (
        <Nothing />
      ) : (
        <div className="myproducts">
          {products?.map((product) => {
            if (findUser === product.username)
              return <ProductCard key={product.postId} product={product} />;
          })}
        </div>
      )}
    </div>
  );
}

export default MyProducts;
