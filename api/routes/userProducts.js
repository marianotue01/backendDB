import express from "express";
import UserProduct from "../models/UserProduct.js";

const router = express.Router();

// GET all user-product relationships
router.get("/", async (req, res) => {
  try {
    const relations = await UserProduct.find()
      .populate("userId")     // Populate user info
      .populate("productId"); // Populate product info
    res.json(relations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single user-product relationship by ID
router.get("/:id", async (req, res) => {
  try {
    const relation = await UserProduct.findById(req.params.id)
      .populate("userId")
      .populate("productId");
    if (!relation) return res.status(404).json({ error: "Relation not found" });
    res.json(relation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new user-product relationship
router.post("/", async (req, res) => {
  try {
    const newRelation = new UserProduct(req.body);
    await newRelation.save();
    res.status(201).json(newRelation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update relationship by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await UserProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Relation not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE relationship by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await UserProduct.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Relation not found" });
    res.json({ message: "Relation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
