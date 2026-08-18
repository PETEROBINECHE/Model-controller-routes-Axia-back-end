import express from "express";
import { alluser, userDelete, userlogin, userPost, userput } from "../controller/user.controller.js";
const router = express.Router();

router.get("/", alluser);

router.post("/user", userPost);

// Best varsion
router.put("/user/:id", userput);

router.delete("/user/:id", userDelete);

router.post("/login", userlogin);





export default router;
