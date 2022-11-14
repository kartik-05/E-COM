import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import {
  createProduct,
  updateProductDetails,
} from "../../../actions/GamePosts";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { Backdrop, CircularProgress } from "@mui/material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import "./EditProductDetails.css";

function EditProductDetails({ setFade }) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [themeColor, setThemeColor] = useState("#4169e1");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { category } = useParams();
  const location = useLocation();
  const username = JSON.parse(localStorage.getItem("profile"))?.result?.name;
  const product = useSelector((state) =>
    state.Products.products?.find((product) => product.postId === id)
  );
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const HandleSubmit = (e) => {
    e.preventDefault();
    setOpenBackdrop(true);
    if (id) {
      dispatch(
        updateProductDetails(id, {
          name: name,
          brand: brand,
          price: price,
          desc: desc,
          themeColor: themeColor,
        })
      );
    } else {
      const Uid = v4();
      dispatch(
        createProduct(
          {
            postId: Uid,
            username: username,
            category: category,
            name: name,
            brand: brand,
            price: price,
            desc: desc,
            themeColor: themeColor,
          },
          navigate
        )
      );
      setFade(false);
    }

    setTimeout(() => {
      toast.success("Details Uploaded");
      setOpenBackdrop(false);
    }, 3000);
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setPrice(product.price);
      setDesc(product.desc);
      setThemeColor(product.themeColor);
    }
  }, [product, location]);

  return (
    <>
      <Backdrop
        open={openBackdrop}
        sx={{ backgroundColor: "#00000080", zIndex: "20" }}
      >
        <CircularProgress />
      </Backdrop>
      <div className="edit-product-details-container">
        <div className="edit-product-details-heading">Product Details</div>
        <form
          id="edit-product-details-form"
          className="product-details-edit-form"
          onSubmit={HandleSubmit}
        >
          <TextField
            variant="outlined"
            size="small"
            label="Name"
            margin="normal"
            fullWidth={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
            autoFocus={true}
          />
          <TextField
            variant="outlined"
            size="small"
            label="Brand"
            margin="normal"
            fullWidth={true}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required={true}
          />
          <TextField
            variant="outlined"
            size="small"
            label="Price"
            margin="normal"
            fullWidth={true}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            required={true}
          />
          <TextField
            variant="outlined"
            size="small"
            label="Description"
            margin="dense"
            fullWidth={true}
            multiline={true}
            rows={5}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <InputLabel
            htmlFor="input-page-color-theme"
            size="small"
            sx={{ marginBottom: "15px" }}
          >
            Choose page color theme
          </InputLabel>
          <Input
            id="input-page-color-theme"
            value={themeColor}
            type="color"
            fullWidth={true}
            sx={{ marginBottom: "10px" }}
            onChange={(e) => setThemeColor(e.target.value)}
          />
        </form>
        <Button
          form="edit-product-details-form"
          type="submit"
          variant="contained"
          fullWidth={true}
          sx={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default EditProductDetails;
