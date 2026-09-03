import postModel from "../model/post.model.js";
import jwt from "jsonwebtoken";

export const getAllPost = async (req, res, next) => {
    try {
        const allPost = await postModel.find()
        return res.status(200).json({ message: "All post gotten successfully", allPost });
    } catch (error) {
        next(error)
    }
};


export const getOneUserPost = async (req, res, next) => {
    const creatorid = req.params.creatorid
    try {
        const userPost = await postModel.find({creatorid});
        return res.status(200).json({ message: "User post gotten successfully", userPost });
    } catch (error) {
        next(error)
    }
};

export const createPost = async (req, res, next) => {    
  const body = req.body;
  try {
    const createNewPost = new postModel({ ...body, creatorid: req.userinfo.id });
    await createNewPost.save();
    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    next(error)
}};

export const updatePost = async (req, res, next) => {
    const id = req.params.id;    
    try {
        const editpost = await postModel.findByIdAndUpdate(id, req.body);
        return res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
        next(error)
    }
};

export const deletePost = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deleteP = await postModel.findByIdAndDelete(id)
        return res.status(203).json({message: "Post deleted successfully"}); 
    } catch (error) {
        const myError = new Error("something is wrong");
        throw myError;
        next(error)
    }
};



export const deleteAllPost = async (req, res, next) => {
    const creatorid = req.params.creatorid
    try {
        const deleteAllP = await postModel.find({creatorid}).deleteMany();
        return res.status(200).json({ message: "All post deleted successfully", deleteAllP });
    } catch (error) {
        next(error)
    }
};