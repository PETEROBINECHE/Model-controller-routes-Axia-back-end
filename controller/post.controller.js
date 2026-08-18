import postModel from "../model/post.model.js";

export const getAllPost = async (req, res) => {
    try {
        const allPost = await postModel.find()
        return res.status(200).json({ message: "All post gotten successfully", allPost });
    } catch (error) {
        return res.status(500).send(error.message)
    }
};


export const getOneUserPost = async (req, res) => {
    const creatorid = req.params.creatorid
    try {
        const allPost = await postModel.find({creatorid});
        return res.status(200).json({ message: "User post gotten successfully", allPost });
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

export const createPost = async (req, res) => {
  const payload = req.body;
  try {
    const createNewPost = new postModel({ ...payload });
    await createNewPost.save();
    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updatePost = async (req, res) => {
    const id = req.params.id;

    try {
        const editpost = await postModel.findByIdAndUpdate(id, req.body);
        return res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      return res.status(500).send(error.message);  
    }
};

export const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteP = await postModel.findByIdAndDelete(id)
        return res.status(203).json({message: "Post deleted successfully"}); 
    } catch (error) {
        return res.status(500).json({message: "something is wrong"});
    }
};



export const deleteAllPost = async (req, res) => {
    const creatorid = req.params.creatorid
    try {
        const deleteAllP = await postModel.find({creatorid}).deleteMany();
        return res.status(200).json({ message: "All post deleted successfully", deleteAllP });
    } catch (error) {
        return res.status(500).json({message: "something is wrong"})
    }
};