import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Nothing from "../Nothing/Nothing";
import Carousel from "./Carousel/Carousel";
import "./ProductInfo.css";
import ProdutctInfoCard from "./ProductInfoCard/ProdutctInfoCard";

function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getProduct = useSelector((state) =>
    state.Products.products?.find((product) => product.postId === id)
  );

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (getProduct) {
      setProduct(getProduct);
    }
  }, [getProduct]);

  return (
    <>
      {product === null ? (
        <Nothing />
      ) : (
        <div className="product-info-container">
          <div className="sub-nav">
            <button className="back" onClick={() => navigate(-1)}>
              &lt; BACK
            </button>
          </div>
          <div className="product-info-row-1">
            <div className="product-info-row-1-container-heading">
              {product.name}
            </div>
            <div className="product-info-row-1-container-tag">
              <div>{product.category}</div>
            </div>
            <div className="product-info-row-1-content">
              <Carousel product={product} />
              <ProdutctInfoCard product={product} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductInfo;
