import express from "express";
import userrouter from "./router/user.routes.js";
import productrouter from "./router/product.routes.js";
import postroutes from "./router/post.routes.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const DBconnect = () => {
  mongoose
    .connect(process.env.DBURL)
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log(error.message));
};

const app = express();
const PORT = 5000;

// middlewel
app.use(express.json());

app.use(userrouter);
app.use(productrouter);
app.use(postroutes);

app.listen(PORT, () => {
  DBconnect()
  console.log(`sever is runing ${PORT} YES`);
});
