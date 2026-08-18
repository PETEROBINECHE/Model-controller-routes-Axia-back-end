import { dataproduct } from "../model/product.model.js";

export const allproduct = (req, res) => {
  res.send(dataproduct);
};