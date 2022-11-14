import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import DeleteDialogAlert from "../DeleteDialogAlert/DeleteDialogAlert";

function ProductCard({ product }) {
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const [open, setOpen] = useState(false);
  const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="product-card-container">
      <div className="card-image-conainter">
        {user?.name === product?.username && (
          <div className="product-card-nav-container">
            <div className="product-card-nav">
              <div className="product-card-nav-items">
                <Link to={`/sell/${product?.category}/${product?.postId}`}>
                  <Tooltip title="Edit" placement="top">
                    <IconButton>
                      <EditIcon sx={{ color: "black", fontSize: "1rem" }} />
                    </IconButton>
                  </Tooltip>
                </Link>
              </div>
              <div className="product-card-nav-items">
                <Tooltip title="Delete" placement="top">
                  <IconButton onClick={() => setOpen(true)}>
                    <DeleteIcon sx={{ color: "black", fontSize: "1rem" }} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <DeleteDialogAlert
              open={open}
              setOpen={setOpen}
              product={product}
            />
          </div>
        )}
        <Link
          className="links-styles"
          key={product?.postId}
          to={`/product/${product?.postId}`}
        >
          <div className="card-image-container-overlay"></div>
        </Link>

        <img
          src={product?.thumbnail}
          alt="thumbnail"
          style={
            product.category === "Game"
              ? { objectFit: "cover" }
              : { objectFit: "contain" }
          }
        />
      </div>
      <div className="product-card-originals">{product?.category}</div>
      <div className="product-name">{product?.name}</div>
      <div className="product-price">&#8377; {addCommas(product?.price)}</div>
    </div>
  );
}

export default ProductCard;
