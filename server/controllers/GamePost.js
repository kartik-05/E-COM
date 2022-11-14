import express from "express";
import mongoose from "mongoose";

import GamePost from "../models/gamePost.js";

export const getGamePosts = async (req, res) => {
  try {
    const gamePosts = await GamePost.find();
    res.status(200).json(gamePosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createGamePost = async (req, res) => {
  const {
    postId,
    username,
    userId,
    category,
    name,
    brand,
    price,
    desc,
    themeColor,
  } = req.body;

  const newGamePostMessage = new GamePost({
    postId,
    username,
    userId,
    category,
    name,
    brand,
    price,
    desc,
    themeColor,
  });
  try {
    await newGamePostMessage.save();
    res.status(201).json(newGamePostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateGameDetails = async (req, res) => {
  const { id } = req.params;
  const { postId, username, category, name, brand, price, desc, themeColor } =
    req.body;

  const data = await GamePost.findOne({ postId: id });

  if (!data) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  const updatedPost = {
    ...data._doc,
    name: name,
    price: price,
    brand: brand,
    desc: desc,
    themeColor: themeColor,
  };

  try {
    await GamePost.findOneAndUpdate({ postId: id }, updatedPost, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    return res.status(404).send(`Something Went Wrong`);
  }
};

export const updateProductImage = async (req, res) => {
  const updData = req.body;
  const id = updData.id;
  const imgName = updData.name;
  const img = updData.image;

  try {
    const data = await GamePost.findOne({ postId: id });

    if (!data) {
      return res.status(404).send(`No post with id: ${id}`);
    }

    let updatedPost = null;
    if (imgName === "Thumbnail") {
      updatedPost = { ...data._doc, thumbnail: img };
    } else if (imgName === "Logo") {
      updatedPost = { ...data._doc, logo: img };
    } else if (imgName === "Image1") {
      updatedPost = { ...data._doc, image1: img };
    } else if (imgName === "Image2") {
      updatedPost = { ...data._doc, image2: img };
    } else if (imgName === "Image3") {
      updatedPost = { ...data._doc, image3: img };
    }

    if (!updatedPost) {
      return res.status(404).send("Something Went Wrong!");
    }

    await GamePost.findOneAndUpdate({ postId: id }, updatedPost, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    return res.status(404).send("Something Went Wrong!");
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await GamePost.deleteOne({ postId: id });
    res.json({ message: "Post deleted successfully." });
  } catch (error) {
    console.log(error);
  }
};
