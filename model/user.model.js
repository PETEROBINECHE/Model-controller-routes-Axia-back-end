import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  age:  {
    required: true,
    type: Number,
  },
  password: {
    required: true,
    type: String
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