import mongoose from "mongoose";

const gamePostSchema = mongoose.Schema({
  postId: String,
  username: String,
  userId: String,
  category: String,
  name: String,
  brand: String,
  price: Number,
  desc: String,
  themeColor: String,
  thumbnail: {
    type: String,
    default: "",
  },
  logo: {
    type: String,
    default: "",
  },
  image1: {
    type: String,
    default: "",
  },
  image2: {
    type: String,
    default: "",
  },
  image3: {
    type: String,
    default: "",
  },
});

var GamePost = mongoose.model("GamePost", gamePostSchema);

export default GamePost;
