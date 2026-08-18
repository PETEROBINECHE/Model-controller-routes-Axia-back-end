import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    previewpix: {
        type: String,
        required: true
    },
    detailedpix: {
        type: String,
        required: true
    },
    creatorid: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    tagname: {
        type: String,
        toLowerCase: true
    }
}, {timestamps: true});


const postModel = mongoose.model("posts", postSchema);

export default postModel;


