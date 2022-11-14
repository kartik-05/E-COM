import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/GamePosts";
import storage from "../../firebaseConfig/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import { Backdrop, CircularProgress } from "@mui/material";

import "./DeleteDialogAlert.css";

function DeleteDialogAlert({ open, setOpen, product }) {
  const dispatch = useDispatch();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const RemoveAllImage = async () => {
    const thumbnailRef = ref(storage, product.thumbnail);
    const logoRef = ref(storage, product.logo);
    const image1Ref = ref(storage, product.image1);
    const image2Ref = ref(storage, product.image2);
    const image3Ref = ref(storage, product.image3);

    try {
      if (thumbnailRef._location.path_ !== "") {
        await deleteObject(thumbnailRef);
      }
      if (logoRef._location.path_ !== "") {
        await deleteObject(logoRef);
      }
      if (image1Ref._location.path_ !== "") {
        await deleteObject(image1Ref);
      }
      if (image2Ref._location.path_ !== "") {
        await deleteObject(image2Ref);
      }
      if (image3Ref._location.path_ !== "") {
        await deleteObject(image3Ref);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HandleDeletePost = async () => {
    setOpenBackdrop(true);
    dispatch(deletePost(product));
    try {
      await RemoveAllImage();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setOpenBackdrop(false);
    }, 3000);
    handleClose();
  };

  return (
    <>
      <Backdrop
        open={openBackdrop}
        sx={{ backgroundColor: "#00000080", zIndex: "20" }}
      >
        <CircularProgress />
      </Backdrop>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="delete-dialog-heading">
          Delete {`{ ${product.name} }`} Permanently ?
        </div>
        <DialogActions>
          <Button onClick={HandleDeletePost} variant="contained" color="error">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteDialogAlert;
