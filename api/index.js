import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// --- DB Connection ---
mongoose
  .connect(process.env.MONGO_URI, { dbName: "prop_eval" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Schema ---
const propertySchema = new mongoose.Schema({
  address: String,
  size: Number,      // m²
  rooms: Number,
  price: Number      // precio real (si lo conocemos)
});

const Property = mongoose.model("Property", propertySchema);

// --- Routes ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running" });
});

app.post("/api/properties", async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/properties", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

// --- Run locally (Vercel usará el handler) ---
if (process.env.NODE_ENV !== "production") {
  const port = 8000;
  app.listen(port, () => console.log(`🚀 Backend running on http://localhost:${port}`));
}

export default app;
