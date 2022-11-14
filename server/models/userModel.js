import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: {
    type: [String],
  },
  cart: {
    type: [String],
  },
});

export default mongoose.model("Users", userSchema);
