import { Router } from "express";
import { ObjectId } from "mongodb";

import { db } from "../utils/db.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");

  const products = await collection.find().toArray();

  return res.json({ data: products });
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");

  const productData = { ...req.body };
  const products = await collection.insertOne(productData);

  return res.json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:productId", async (req, res) => {
  const collection = db.collection("products");

  const productId = new ObjectId(req.params.productId);

  const newProductData = { ...req.body };

  await collection.updateOne(
    {
      _id: productId,
    },
    {
      $set: newProductData,
    }
  );

  return res.json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:productId", async(req, res) => {
    const collection = db.collection("products");

    const productId = new ObjectId(req.params.productId);

    await collection.deleteOne({
      _id: productId,
    });
  
    return res.json({
      message: "Product has been deleted successfully"
    });
});

export default productRouter;
