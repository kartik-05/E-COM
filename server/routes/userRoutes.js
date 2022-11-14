import express from "express";
import {
  signin,
  signup,
  wishlist,
  cart,
} from "../controllers/userControllers.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/wishlist", auth, wishlist);
router.post("/cart", auth, cart);

export default router;
