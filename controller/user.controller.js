import bcrypt, { hash } from "bcrypt";
import usermodel from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const alluser = async (req, res, next) => {
  try {
    const alluser = await usermodel.find();
    res.status(200).json({ alluser });
  } catch (error) {
    next(error);
  }
};

export const userPost = async (req, res, next) => {
  const { password, ...others } = req.body;
  const hashpass = await bcrypt.hash(password, 10);
  try {
    //CHECK IF USER EXIST
    const isuers = await usermodel.findOne({ email: others.email });
    if (isuers) return res.status(200).json({ message: "user already exist?" });
    // CONTINUE WITH REGISTRATION.
    const user = new usermodel({ ...others, password: hashpass });
    const saveduser = await user.save();
    return res
      .status(201)
      .json({ massage: "User created successfully", saveduser });
  } catch (error) {
    next(error);
  }
};

export const userput = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updataduser = await usermodel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ massage: "user updated" });
  } catch (error) {
    next(error)
  }
};

export const userDelete = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteone = await usermodel.findByIdAndDelete(id);
    return res.status(200).json(deleteone);
  } catch (error) {
    next(error)
  }
};

// user-login with findone()
export const userlogin = async (req, res, next) => {
  const { password, email } = req.body;
  if (!password || !email) {
    const myError = new Error("input correct email and password");
      myError.status = 404;
      throw myError;
  }
  try {
    const isuser = await usermodel.findOne({ email });
    if (!isuser) { 
      const myError = new Error("email don't exist, register now");
      myError.status = 404;
      throw myError;
    }

    const correctpass = await bcrypt.compare(password, isuser.password);
    if (!correctpass) {
      res.status(404).json({ message: "incorrect password" });
    }
    const payload = { id: isuser.id, email: isuser.email };
    const token = jwt.sign(payload, process.env.token_privite_code);
    const body = {
      username: isuser.username,
      email: isuser.email,
      status: isuser.status,
      token,
    };
    return res.status(200).json({ message: "Login successfully", body });
  } catch (error) {
    next(error)
  }
};
