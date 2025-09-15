import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Proposal from "./models/Proposal.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS abierto para pruebas
app.use(cors({ origin: "*" }));

// --- DB Connection ---
mongoose
  .connect(process.env.MONGO_URI, { dbName: "prop_eval" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Routes ---
app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Backend running" }));

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

app.post("/api/evaluate", async (req, res) => {
  try {
    const proposals = await Proposal.find();
    const evaluated = proposals
      .map((p) => ({ ...p.toObject(), score: p.value * 0.5 - p.cost * 0.3 - p.risk * 0.2 }))
      .sort((a, b) => b.score - a.score);
    res.json(evaluated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`🚀 Backend running on port ${port}`));
