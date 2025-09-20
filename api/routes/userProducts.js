import express from "express";
import UserProduct from "../models/UserProduct.js";

const router = express.Router();

/**
 * @openapi
 * /api/user-products:
 *   get:
 *     summary: Get all user-product relationships
 *     tags: [UserProducts]
 *     responses:
 *       200:
 *         description: List of relations
 */
router.get("/", async (req, res) => {
  try {
    const relations = await UserProduct.find()
      .populate("userId")
      .populate("productId");
    res.json(relations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @openapi
 * /api/user-products:
 *   post:
 *     summary: Create a new user-product relationship
 *     tags: [UserProducts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Relation created
 */
router.post("/", async (req, res) => {
  try {
    const newRelation = new UserProduct(req.body);
    await newRelation.save();
    res.status(201).json(newRelation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
