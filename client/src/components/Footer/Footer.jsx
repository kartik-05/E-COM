import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-sub-container">
        <div className="footer-col-1">
          <div className="footer-logo">GAMEON</div>
          <div className="footer-icons">
            <div className="footer-icon">
              <InstagramIcon /> &nbsp;
            </div>
            <div className="footer-icon">
              <FacebookOutlinedIcon /> &nbsp;
            </div>
            <div className="footer-icon">
              <TwitterIcon /> &nbsp;
            </div>
            <div className="footer-icon">
              <EmailIcon /> &nbsp;
            </div>
          </div>
        </div>
        <div className="footer-col-2">
          <div className="footer-col-2-heading">Categories</div>
          <div className="footer-col-2-items">Games</div>
          <div className="footer-col-2-items">Keyboards</div>
          <div className="footer-col-2-items">Mouse</div>
          <div className="footer-col-2-items">Headphones</div>
          <div className="footer-col-2-items">Mics</div>
        </div>
        <div className="footer-col-3">
          <div className="footer-col-3-heading">Services</div>
          <div className="footer-col-3-items">Sell</div>
          <div className="footer-col-3-items">Buy</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
