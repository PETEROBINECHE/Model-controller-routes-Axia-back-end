import bcrypt, { hash } from "bcrypt";
import usermodel from "../model/user.model.js";
import jwt from 'jsonwebtoken';


export const alluser = async (req, res) => {
  try {
    const alluser = await usermodel.find();
    res.status(200).json({ alluser });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const userPost = async (req, res) => {
  const { password, ...others } = req.body;
  const hashpass = await bcrypt.hash(password, 10);
  try {
    //CHECK IF USER EXIST
    const isuers = await usermodel.findOne({ email: others.email });
    if (isuers) return res.status(200).json({message: "user already exist?"});
    // CONTINUE WITH REGISTRATION.
    const user = new usermodel({ ...others, password: hashpass });
    const saveduser = await user.save();
    return res
      .status(201)
      .json({ massage: "User created successfully", saveduser });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const userput = async (req, res) => {
  const id = req.params.id;
  try {
    const updataduser = await usermodel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ massage: "user updated" });
  } catch (error) {
    res.send(error.message);
  }
};

export const userDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteone = await usermodel.findByIdAndDelete(id);
    return res.status(200).json(deleteone);
  } catch (error) {
    res.send(error.massage);
  }
};


// user-login with findone()
export const userlogin = async (req, res) => {
  const { password, email } = req.body;
  if(!password || !email) {
    return res.status(404).json({message: "input correct email and password"})
  }
  try {
    const isuser = await usermodel.findOne({email});
    if (!isuser){
      return res.status(200).json({ message: "email don't exist, register now" })};

    const correctpass = await bcrypt.compare(password, isuser.password);
    if (!correctpass) {res.json({ message: "incorrect password" })};
    const payload = {id: isuser.id, email: isuser.email};
    const token = jwt.sign(payload, process.env.token_privite_code);
    const body = {username: isuser.username, email: isuser.email, status: isuser.status, token };
    return res.status(200).json({message: "Login successfully", body });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
