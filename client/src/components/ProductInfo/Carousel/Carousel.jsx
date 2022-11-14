import React, { useState } from "react";
import "./Carousel.css";

function Carousel({ product }) {
  const imgData = [product?.image1, product?.image2, product?.image3];
  const smallThumbnailData = [
    product?.image1,
    product?.image2,
    product?.image3,
  ];
  const [currIdx, setCurrIdx] = useState(0);

  // const moveNext = () => {
  //   currIdx === len - 1 ? setCurrIdx(0) : setCurrIdx(currIdx + 1);
  // };

  // const moveBack = () => {
  //   currIdx === 0 ? setCurrIdx(len - 1) : setCurrIdx(currIdx - 1);
  // };

  const moveThumbnail = (index) => {
    setCurrIdx(index);
  };

  return (
    <div className="carousel-container">
      {/* <div className="carousel-container-heading">{product.name}</div>
      <div className="carousel-container-tag">
        <div>{product.category}</div>
      </div> */}
      <div className="carousel-container-image-section">
        {/* <IconButton className="home-carousel-button" onClick={moveBack}>
          <ArrowBackIosIcon fontSize="medium" />
        </IconButton> */}
        {imgData.map((image, index) => {
          return (
            <div
              key={index}
              className={
                currIdx === index
                  ? "carousel-image-container active-anim"
                  : "carousel-image-container"
              }
            >
              <img
                src={image}
                alt=""
                style={
                  product.category === "Game"
                    ? { objectFit: "cover" }
                    : { objectFit: "contain" }
                }
              />
            </div>
          );
        })}
        {/* <IconButton className="home-carousel-button " onClick={moveNext}>
          <ArrowForwardIosIcon fontSize="medium" />
        </IconButton> */}
      </div>

      <div className="small-thumbnails-container">
        {Array.from({ length: 3 }).map((item, index) => (
          <div key={index} onClick={() => moveThumbnail(index)}>
            <div
              className={
                index === currIdx
                  ? "small-thumbnail small-thumbnail-active"
                  : "small-thumbnail"
              }
              style={
                index === currIdx
                  ? { border: `2px solid ${product.themeColor}` }
                  : {}
              }
            >
              <img src={smallThumbnailData[index]} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
