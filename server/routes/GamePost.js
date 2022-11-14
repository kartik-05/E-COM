import express from "express";
import {
  getGamePosts,
  createGamePost,
  updateGameDetails,
  deletePost,
  updateProductImage,
} from "../controllers/GamePost.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getGamePosts);
router.post("/create", auth, createGamePost);
router.patch("/UpdateGameDetails/:id", auth, updateGameDetails);
router.delete("/delete/:id", auth, deletePost);
router.patch("/updateimage", auth, updateProductImage);

export default router;
