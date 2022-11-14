import React, { useEffect } from "react";
import "./HomeCarousel.css";
import Untitled1 from "../../images/Untitled1.png";
import Untitled2 from "../../images/Untitled2.png";
import Untitled3 from "../../images/Untitled3.png";
import Untitled4 from "../../images/Untitled4.png";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";

const ButtonStylesExplore = {
  background: "white",
  color: "black",
  padding: "15px 30px",
  fontWeight: "bold",
  position: "absolute",
  bottom: "15%",
  left: "10%",
  border: "2px solid white",
};

const ButtonStylesSell = {
  color: "white",
  padding: "15px 40px",
  fontWeight: "bold",
  position: "absolute",
  bottom: "15%",
  left: "30%",
  border: "2px solid white",
};

function HomeCarousel() {
  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  const imgData = [Untitled1, Untitled2, Untitled3, Untitled4];
  const len = imgData.length;
  const [currIdx, setCurrIdx] = useState(0);
  const moveNext = () => {
    currIdx === len - 1 ? setCurrIdx(0) : setCurrIdx(currIdx + 1);
  };

  // const moveBack = () => {
  //   currIdx === 0 ? setCurrIdx(len - 1) : setCurrIdx(currIdx - 1);
  // };

  const moveDot = (index) => {
    setCurrIdx(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveNext();
    }, 4000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const HandleClick = () => {
    if (!user) {
      alert("Please Sign In to perform this action!");
      return;
    }
  };

  return (
    <div className="home-carousel-container">
      <div className="home-carousel-container-image-section">
        {/* <IconButton className="home-carousel-button" onClick={moveBack}>
          <ArrowBackIosIcon fontSize="medium" />
        </IconButton> */}
        <div className="home-carousel-container-overlay">
          <div className="home-carousel-container-overlay-heading">
            Explore all Popular <br></br> Games and Gaming Accessories!
          </div>
          <div className="home-carousel-container-overlay-subheading">
            Find best deals over mechanical keyboards,<br></br> mouse, gaming
            headsets, mics and manymore <br></br> from top brands in the market
            like corsair,<br></br> logitech, keychron, rode etc...
          </div>
          <Button
            variant="contained"
            style={ButtonStylesExplore}
            onClick={HandleClick}
          >
            Wishlist Now
          </Button>
          <Button
            variant="outlined"
            style={ButtonStylesSell}
            onClick={HandleClick}
          >
            Sell Now
          </Button>
        </div>
        {imgData.map((image, index) => {
          return (
            <div
              key={index}
              className={
                currIdx === index
                  ? "home-carousel-image-container active-anim"
                  : "home-carousel-image-container"
              }
            >
              <img src={image} alt="" />
            </div>
          );
        })}
        {/* <IconButton className="home-carousel-button " onClick={moveNext}>
          <ArrowForwardIosIcon fontSize="medium" />
        </IconButton> */}
      </div>

      <div className="home-carousel-container-dots">
        {Array.from({ length: 4 }).map((item, index) => (
          <IconButton key={index} onClick={() => moveDot(index)}>
            {index === currIdx ? (
              <CircleIcon sx={{ fontSize: "0.7rem" }} />
            ) : (
              <CircleOutlinedIcon sx={{ fontSize: "0.7rem" }} />
            )}
          </IconButton>
        ))}
      </div>
    </div>
  );
}

export default HomeCarousel;
