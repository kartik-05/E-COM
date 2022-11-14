import React, { useState } from "react";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import "./Navbar.css";
import { useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import jwt_decode from "jwt-decode";
function Navbar() {
  const findUser = JSON.parse(localStorage.getItem("profile"));
  const [user, setUser] = useState(findUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expired, setExpired] = useState(false);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const HandleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const HandleMenuClose = () => {
    setAnchorEl(null);
  };

  const HandleLogOut = () => {
    dispatch({ type: "logout" });
    navigate("/", { replace: true });
    HandleMenuClose();
    setUser(null);
  };

  const HandleHome = () => {
    navigate("/");
  };
  const HandleSell = () => {
    if (!user) {
      alert("Sign In to Sell Product!");
      return;
    }
    navigate("/sell");
  };

  const HandleMyProducts = () => {
    if (!user) {
      alert("Sign In to Check My Products!");
      return;
    }
    navigate("/MyProducts");
  };

  const HandleWishlist = () => {
    if (!user) {
      alert("Sign In to Check Wishlist!");
      return;
    }
    navigate("/wishlist");
  };

  const HandleCart = () => {
    if (!user) {
      alert("Sign In to Check Cart!");
      return;
    }
    navigate("/cart");
  };

  const HandleSignIn = () => {
    if (user) {
      return;
    }
    navigate("/auth", { replace: true });
  };

  // useEffect(() => {
  //   if (findUser) {
  //     setUser(findUser);
  //   }
  // }, [findUser]);

  useEffect(() => {
    const token = user ? user.token : null;
    if (token) {
      const decodedToken = jwt_decode(user?.token, { complete: true });
      const dateNow = new Date();
      if (decodedToken.exp * 1000 < dateNow.getTime()) {
        console.log("yes");
        setExpired(true);
      }
    }
  }, [location]);

  useEffect(() => {
    if (expired) {
      dispatch({ type: "logout" });
      setExpired(false);
    }
  }, [expired, dispatch]);
  return (
    <div className="navbar-container">
      <div className="navbar-logo-container">
        <div
          className={
            location.pathname === "/"
              ? "navbar-items navbar-item-selected"
              : "navbar-items"
          }
          onClick={HandleHome}
        >
          HOME
        </div>
      </div>
      <div className="navbar-items-container">
        <div
          className={
            location.pathname === "/sell"
              ? "navbar-items navbar-item-selected"
              : "navbar-items"
          }
          onClick={HandleSell}
        >
          <StorefrontOutlinedIcon sx={{ fontSize: "1rem" }} />
          &nbsp; SELL
        </div>
        <div
          className={
            location.pathname === "/MyProducts"
              ? "navbar-items navbar-item-selected"
              : "navbar-items"
          }
          onClick={HandleMyProducts}
        >
          <CategoryOutlinedIcon sx={{ fontSize: "1rem" }} />
          &nbsp; MY PRODUCTS
        </div>
        <div
          className={
            location.pathname === "/wishlist"
              ? "navbar-items navbar-item-selected"
              : "navbar-items"
          }
          onClick={HandleWishlist}
        >
          <GradeOutlinedIcon sx={{ fontSize: "1rem" }} />
          &nbsp; WISHLIST
        </div>
        <div
          className={
            location.pathname === "/cart"
              ? "navbar-items navbar-item-selected"
              : "navbar-items"
          }
          onClick={HandleCart}
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: "1rem" }} />
          &nbsp; CART
        </div>
        {user ? (
          <>
            <Button
              onClick={HandleMenuOpen}
              sx={{
                color: "#4169e1",
                fontWeight: "600",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
              }}
            >
              | {user?.result.name} |
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={HandleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={HandleLogOut}>
                <LogoutIcon fontSize="small" /> &nbsp; Log out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button onClick={HandleSignIn}>
            <div className="navbar-items">
              <LoginIcon sx={{ fontSize: "1rem" }} /> &nbsp; Sign In
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
