import express from "express";
import { createPost, deletePost, getAllPost, getOneUserPost, deleteAllPost, updatePost } from "../controller/post.controller.js";
import { tokenathu } from "../middlewel/token.middlewel.js";

const router = express.Router();

router.get("/allPost", getAllPost);

router.get("/userPost/:creatorid", getOneUserPost);

router.post("/createNewPost", tokenathu, createPost);

router.put("/editPost/:id", updatePost);

router.delete("/removePost/:id", deletePost);

router.delete("/deleteAlluserPost/:creatorid", deleteAllPost);

export default router