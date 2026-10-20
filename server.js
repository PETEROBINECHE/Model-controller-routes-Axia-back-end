import express, { text } from "express";
import userrouter from "./router/user.routes.js";
import productrouter from "./router/product.routes.js";
import postroutes from "./router/post.routes.js";
import errorhandler from "./middlewel/erroe.middlewel.js";
import mongoose, { Types } from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

const DBconnect = () => {
  mongoose
    .connect(process.env.DBURL)
    .then(() => console.log("DB Connected"))
    .catch((error) => console.log(error.message));
};

// Adding cloudinary config
cloudinary.config({
  cloud_name: process.env.my_cloud_name,
  api_key: process.env.my_key,
  api_secret: process.env.my_api_secret,
});

// ( async function () {
//   const results = await cloudinary.uploader.upload('./uploads/7f61be633207fa7b408c187364d61e6c')
//   console.log("hhhhh", results);
// })();

// adding multer
const upload = multer({dest: "uploads/"});
const app = express();
const PORT = 5000;

// middlewel
app.use(express.json());
app.use(express.text({ type: "text/plain" }));
app.use(express.text({ type: "application/javascript" }));
app.use(express.text({ type: "application/xml" }));
app.use(express.text({ type: "text/html" }));
// cors is use to controle how many front-end request from ur server.
app.use(cors({ origin: "http//localhost:3000", credentials: true }));

// using multer 4 ways?
// Multer is a node.js middleware for handling multipart/form-data,
// which is primarily used for uploading files
// single-file multer
app.post("/single-field-single-file", upload.single("dp"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const result = await cloudinary.uploader.upload(req.file.path, {resource_type: "auto"})
  console.log(result.secure_url);
  
  return res.status(200).json({ message: "working up" });
});
// multiple-files multer
app.post(
  "/single-field-multiple-files",
  upload.array("cert", 10),
  (req, res) => {
    console.log(req.body);
    console.log(req.files);

    return res.status(200).json({ message: "working multiple" });
  },
);
//multiple-fields multer
// const uploadMiddleware = upload.fields([
//   { name: "dp", maxCount: 2 },
//   { name: "cert", maxCount: 8 },
//   { name: "doc", maxCount: 3 },
// ]);
app.post("/multiple-fields-multiple-fields", upload.fields([
  { name: "dp", maxCount: 2 },
  { name: "cert", maxCount: 8 },
  { name: "doc", maxCount: 3 },
]), 
(req, res) => {
  console.log(req.body);
  console.log(req.files);

  return res.status(200).json({ message: "working multiple files" });
});

// in multer In case you need to handle a text-only multipart form, you should use the .none() method:
app.post("/single-field-single-file-none", upload.none(), (req, res) => {
  console.log(req.body);
  return res.status(200).json({ message: "working up none" });
});

app.post("/test", (req, res) => {
  console.log(req.body);
  return res.json({ message: "good work" });
});

app.use(userrouter);
app.use(productrouter);
app.use(postroutes);

app.use(errorhandler);

app.listen(PORT, () => {
  DBconnect();
  console.log(`sever is runing ${PORT} YES`);
});
