import React, { useState } from "react";
import { Button } from "@mui/material";
import dftimg from "../../../images/dftimg.png";
import "./EditProductImages.css";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import toast from "react-hot-toast";
import { Backdrop, CircularProgress } from "@mui/material";
import storage from "../../../firebaseConfig/firebaseConfig";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateProductImage } from "../../../actions/GamePosts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function EditProductCarousel({ fade }) {
  const params = useParams();
  const [id, setId] = useState(params.id);
  const product = useSelector((state) =>
    state?.Products?.products?.find((prod) => prod.postId === id)
  );
  const { category } = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [logo, setLogo] = useState(null);

  const [image, setImage] = useState([null, null, null, null, null]);
  const imageNames = ["Thumbnail", "Logo", "Image1", "Image2", "Image3"];
  const imgData = [dftimg, dftimg, dftimg, dftimg, dftimg];

  const [openBackdrop, setOpenBackdrop] = useState(false);

  const dispatch = useDispatch();

  const [currIdx, setCurrIdx] = useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      if (currIdx === 0) {
        setThumbnail(e.target.files[0]);
      } else if (currIdx === 1) {
        setLogo(e.target.files[0]);
      } else if (currIdx === 2) {
        setImage1(e.target.files[0]);
      } else if (currIdx === 3) {
        setImage2(e.target.files[0]);
      } else if (currIdx === 4) {
        setImage3(e.target.files[0]);
      }
    }
  };

  const handleFileName = () => {
    if (currIdx === 0) {
      if (thumbnail) {
        return thumbnail.name;
      }
    } else if (currIdx === 1) {
      if (logo) {
        return logo.name;
      }
    } else if (currIdx === 2) {
      if (image1) {
        return image1.name;
      }
    } else if (currIdx === 3) {
      if (image2) {
        return image2.name;
      }
    } else if (currIdx === 4) {
      if (image3) {
        return image3.name;
      }
    }
  };

  const HandleImageUpload = async () => {
    if (
      (currIdx === 0 && !thumbnail) ||
      (currIdx === 1 && !logo) ||
      (currIdx === 2 && !image1) ||
      (currIdx === 3 && !image2) ||
      (currIdx === 4 && !image3)
    ) {
      alert("No file Choosen");
      return;
    }

    let file = null;
    if (currIdx === 0) file = thumbnail;
    else if (currIdx === 1) file = logo;
    else if (currIdx === 2) file = image1;
    else if (currIdx === 3) file = image2;
    else if (currIdx === 4) file = image3;

    const storageRef = ref(storage, `/files/${v4()}`);
    try {
      setOpenBackdrop(true);
      await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      dispatch(
        updateProductImage({
          id: id,
          name: imageNames[currIdx],
          image: downloadURL,
        })
      );
      setTimeout(() => {
        setOpenBackdrop(false);
        toast.success("Image Uploaded");
      }, 2000);
    } catch (err) {
      setOpenBackdrop(false);
      toast.error("Something went wrong.");
      console.log(err);
    }
  };

  const HandleRemoveImage = async () => {
    let fileRef = ref(storage, image[currIdx]);

    try {
      setOpenBackdrop(true);
      await deleteObject(fileRef);
      dispatch(
        updateProductImage({
          id: id,
          name: imageNames[currIdx],
          image: "",
        })
      );
      toast.success("Image Removed Successfully");
      setOpenBackdrop(false);
    } catch (err) {
      setOpenBackdrop(false);
      toast.error("Something Went Wrong");
      console.log(err);
    }
  };

  useEffect(() => {
    if (product) {
      const imageARRAY = [
        product?.thumbnail,
        product?.logo,
        product?.image1,
        product?.image2,
        product?.image3,
      ];
      setImage((prev) => imageARRAY);
    }
    if (params.id) {
      setId((prev) => params.id);
    }
  }, [dispatch, product, params]);

  return (
    <>
      <Backdrop
        open={openBackdrop}
        sx={{ backgroundColor: "#00000080", zIndex: "20" }}
      >
        <CircularProgress />
      </Backdrop>
      <div
        className={
          fade
            ? "porduct-image-upload-container fade"
            : "porduct-image-upload-container"
        }
      >
        <div className="product-image-upload-heading">Product Images</div>

        <div className="product-info-row-1-container-tag">
          <div>{category}</div>
        </div>

        <div className="product-image-upload-nav">
          {image[currIdx] ? (
            <Button
              variant="contained"
              size="small"
              sx={{ width: "17%" }}
              onClick={HandleRemoveImage}
              color="error"
            >
              REMOVE
            </Button>
          ) : (
            <>
              <label htmlFor="image-upload" className="edit-product-label">
                <AddBoxOutlinedIcon
                  sx={{
                    color: "#1976D2",
                    marginTop: "3px",
                    fontSize: "1.9rem",
                  }}
                />
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
              </label>
              <Button
                variant="contained"
                size="small"
                sx={{ width: "20%" }}
                onClick={HandleImageUpload}
              >
                Upload
              </Button>
            </>
          )}
          <div className="file-name">
            <b>{imageNames[currIdx]}</b> &nbsp; {handleFileName()}
          </div>
        </div>

        <div className="product-image-uplaod-grid">
          {Array.from({ length: 5 }).map((item, idx) => {
            return (
              <div
                className={
                  currIdx === idx
                    ? "product-image-uplaod-grid-items product-image-uplaod-grid-items-selected"
                    : "product-image-uplaod-grid-items"
                }
                onClick={() => {
                  setCurrIdx(idx);
                }}
                key={idx}
              >
                <div className="image-upload-grid-items-label">
                  {imageNames[idx]}
                </div>
                <img src={image[idx] ? image[idx] : imgData[idx]} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default EditProductCarousel;
