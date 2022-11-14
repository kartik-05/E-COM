import React from "react";
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { Link, useNavigate } from "react-router-dom";

import "./Category.css";

function Category() {
  const navigate = useNavigate();
  return (
    <div className="category-container">
      <div className="sub-nav">
        <button className="back" onClick={() => navigate(-1)}>
          &lt; BACK
        </button>
        <div>Choose Category</div>
      </div>

      <div className="categories">
        <Link to="/sell/Game" className="links-styles">
          <div className="category-card">
            <SmartToyOutlinedIcon fontSize="medium" /> &nbsp; &nbsp; Game
          </div>
        </Link>

        <Link to="/sell/Keyboard" className="links-styles">
          <div className="category-card">
            <KeyboardOutlinedIcon fontSize="medium" /> &nbsp; &nbsp; Keyboard
          </div>
        </Link>

        <Link to="/sell/Mouse" className="links-styles">
          <div className="category-card">
            <MouseOutlinedIcon fontSize="medium" /> &nbsp; &nbsp; Mouse
          </div>
        </Link>

        <Link to="/sell/Headphone" className="links-styles">
          <div className="category-card">
            <HeadphonesOutlinedIcon fontSize="medium" /> &nbsp; &nbsp; Headphone
          </div>
        </Link>

        <Link to="/sell/Mic" className="links-styles">
          <div className="category-card">
            <KeyboardVoiceOutlinedIcon fontSize="medium" /> &nbsp; &nbsp; Mic
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Category;
