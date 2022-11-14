import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import GamePosts from "./routes/GamePost.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/products", GamePosts);
app.use("/auth", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});
const port = process.env.PORT || 5000;

const connectionUrl = process.env.MongoUrl;

mongoose
  .connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () =>
      console.log(`Server Running on Port: http://localhost:${port}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
