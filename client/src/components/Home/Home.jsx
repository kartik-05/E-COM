import React, { useEffect, useState } from "react";
import "./Home.css";
import HomeCarousel from "../HomecCrousel/HomeCarousel";
import ProductCard from "../ProductCard/ProductCard";
import Nothing from "../Nothing/Nothing";
import { useSelector } from "react-redux";

function Home() {
  const getProducts = useSelector((state) => state?.Products?.products);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (getProducts) {
      setProducts(getProducts);
    }
  }, [getProducts]);

  return (
    <div className="home-container">
      <HomeCarousel />
      <div className="myproducts-container" style={{ marginTop: "20px" }}>
        <div
          className="sub-nav"
          style={{
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
            padding: "10px 20px",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              textDecoration: "underline",
              textTransform: "uppercase",
            }}
          >
            Games
          </div>
        </div>
        {!products || products.length === 0 ? (
          <Nothing />
        ) : (
          <div className="myproducts" style={{ marginTop: "5px" }}>
            {products?.map((product) => {
              if (product.category === "Game") {
                return <ProductCard key={product.postId} product={product} />;
              }
              return "";
            })}
          </div>
        )}
      </div>
      <div className="myproducts-container" style={{ marginTop: "20px" }}>
        <div
          className="sub-nav"
          style={{
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
            padding: "10px 20px",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              textDecoration: "underline",
              textTransform: "uppercase",
            }}
          >
            Headphones
          </div>
        </div>
        {!products || products.length === 0 ? (
          <Nothing />
        ) : (
          <div className="myproducts" style={{ marginTop: "5px" }}>
            {products?.map((product) => {
              if (product.category === "Headphone") {
                return <ProductCard key={product.postId} product={product} />;
              }
              return "";
            })}
          </div>
        )}
      </div>
      <div className="myproducts-container" style={{ marginTop: "20px" }}>
        <div
          className="sub-nav"
          style={{
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
            padding: "10px 20px",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              textDecoration: "underline",
              textTransform: "uppercase",
            }}
          >
            Keyboards
          </div>
        </div>
        {!products || products.length === 0 ? (
          <Nothing />
        ) : (
          <div className="myproducts" style={{ marginTop: "5px" }}>
            {products?.map((product) => {
              if (product.category === "Keyboard") {
                return <ProductCard key={product.postId} product={product} />;
              }
              return "";
            })}
          </div>
        )}
      </div>
      <div className="myproducts-container" style={{ marginTop: "20px" }}>
        <div
          className="sub-nav"
          style={{
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
            padding: "10px 20px",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              textDecoration: "underline",
              textTransform: "uppercase",
            }}
          >
            Mouse
          </div>
        </div>
        {!products || products.length === 0 ? (
          <Nothing />
        ) : (
          <div className="myproducts" style={{ marginTop: "5px" }}>
            {products?.map((product) => {
              if (product.category === "Mouse") {
                return <ProductCard key={product.postId} product={product} />;
              }
              return "";
            })}
          </div>
        )}
      </div>
      <div className="myproducts-container" style={{ marginTop: "20px" }}>
        <div
          className="sub-nav"
          style={{
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
            padding: "10px 20px",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              textDecoration: "underline",
              textTransform: "uppercase",
            }}
          >
            Mics
          </div>
        </div>
        {!products || products.length === 0 ? (
          <Nothing />
        ) : (
          <div className="myproducts" style={{ marginTop: "5px" }}>
            {products?.map((product) => {
              if (product.category === "Mic") {
                return <ProductCard key={product.postId} product={product} />;
              }
              return "";
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
