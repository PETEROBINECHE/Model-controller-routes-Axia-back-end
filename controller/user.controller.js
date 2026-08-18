import bcrypt, { hash } from "bcrypt";
import usermodel from "../model/user.model.js";

export const alluser = async (req, res) => {
  try {
    const alluser = await usermodel.find();
    res.json({ alluser });
  } catch (error) {
    res.send(error.message);
  }
};

export const userPost = async (req, res) => {
  const { password, ...others } = req.body;
  const hashpass = await bcrypt.hash(password, 10);
  try {
    //CHECK IF USER EXIST
    const isuers = await usermodel.findOne({ email: others.email });
    if (isuers) return res.send("user already exist?");
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
    return res.json(deleteone);
  } catch (error) {
    res.send(error.massage);
  }
};


// user-login with findone()
export const userlogin = async (req, res) => {
  const { password, email } = req.body;
  try {
    const isuser = await usermodel.findOne({email});
    if (!isuser){
      return res.json({ message: "email don't exist, register now" })};

    const correctpass = await bcrypt.compare(password, isuser.password);
    if (!correctpass) {res.json({ message: "incorrect password" })};

    return res.status(200).json({message: "Login successfully", isuser });
  } catch (error) {
    return res.send(error.message);
  }
};
