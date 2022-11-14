import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Users from "../models/userModel.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "6h" }
    );
    const toReturn = existingUser._doc;
    res
      .status(200)
      .json({ result: { ...toReturn, password: null }, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong!" });
  }
};

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Confirm Password don't match!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = new Users({ name, email, password: hashedPassword });
    await result.save();

    const token = jwt.sign(
      { name: result.name, email: result.email, id: result._id },
      "test",
      {
        expiresIn: "6h",
      }
    );
    res
      .status(200)
      .json({ result: { ...result._doc, password: null }, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const wishlist = async (req, res) => {
  if (!req.userId)
    return res.json({ message: "Not authenticated to perform this action." });
  const { email, postId } = req.body;
  try {
    const findUser = await Users.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }
    const index = findUser.wishlist.findIndex((id) => id === String(postId));
    if (index === -1) {
      findUser.wishlist.push(postId);
    } else {
      findUser.wishlist = findUser.wishlist.filter(
        (id) => id !== String(postId)
      );
    }
    const updatePost = await Users.findByIdAndUpdate(findUser._id, findUser, {
      new: true,
    });
    res.json(updatePost._doc.wishlist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const cart = async (req, res) => {
  if (!req.userId)
    return res.json({ message: "Not authenticated to perform this action." });
  const { email, postId } = req.body;
  try {
    const findUser = await Users.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json({ message: "User doesn't exist!" });
    }
    const index = findUser.cart.findIndex((id) => id === String(postId));
    if (index === -1) {
      findUser.cart.push(postId);
    } else {
      findUser.cart = findUser.cart.filter((id) => id !== String(postId));
    }
    const updatePost = await Users.findByIdAndUpdate(findUser._id, findUser, {
      new: true,
    });
    res.json(updatePost._doc.cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};
