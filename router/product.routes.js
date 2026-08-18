import express from "express";
import { allproduct } from "../controller/product.controller.js";
const router = express.Router();

router.get("/product", allproduct);

export default router;
