import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Proposal from "./models/Proposal.js";

// Cargar variables de entorno desde api/.env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- DB Connection ---
mongoose
  .connect(process.env.MONGO_URI, { dbName: "prop_eval" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Routes ---

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running" });
});

// CRUD Proposals
app.post("/api/proposals", async (req, res) => {
  try {
    const proposal = new Proposal(req.body);
    await proposal.save();
    res.json(proposal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/proposals", async (req, res) => {
  try {
    const proposals = await Proposal.find();
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Evaluar propuestas
app.post("/api/evaluate", async (req, res) => {
  try {
    const proposals = await Proposal.find();
    const evaluated = proposals
      .map((p) => ({
        ...p.toObject(),
        score: p.value * 0.5 - p.cost * 0.3 - p.risk * 0.2
      }))
      .sort((a, b) => b.score - a.score);
    res.json(evaluated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Run server ---
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`🚀 Backend running on http://localhost:${port}`));
