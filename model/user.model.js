import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  profilePic: {
    type: String,
    required: true
  },
  email: {
    required: true,
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  age:  {
    required: true,
    type: Number,
    min: 17,
  },
  password: {
    required: true,
    type: String,
    
  },
  state: {
    type: String
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "successful"],
    default: "pending",
  }
}, {timestamps: true});
  

const usermodel = mongoose.model("user", userSchema);

export default usermodel;