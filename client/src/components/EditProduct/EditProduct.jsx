import React, { useState } from "react";
import "./EditProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import EditProductImages from "./EditProductCarousel/EditProductImages";
import EditProductDetails from "./EditProductDetails/EditProductDetails";

function EditProduct() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [fade, setFade] = useState(id ? false : true);

  return (
    <div className="edit-product-container">
      <div className="sub-nav">
        <button className="back" onClick={() => navigate(-1)}>
          &lt; BACK
        </button>
        <div>{!id ? "Sell Product" : "Edit Product"}</div>
      </div>
      <div className="edit-product-row-1">
        <EditProductImages fade={fade} />
        <EditProductDetails setFade={setFade} />
      </div>
    </div>
  );
}

export default EditProduct;
