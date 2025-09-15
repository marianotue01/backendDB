import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // permite llamadas desde cualquier origen, útil para frontend

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
// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running" });
});

// CRUD: crear propiedad
app.post("/api/properties", async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CRUD: listar propiedades
app.get("/api/properties", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

// Evaluación simple
app.post("/api/evaluate", (req, res) => {
  try {
    const { size, rooms } = req.body;

    if (typeof size !== "number" || typeof rooms !== "number") {
      return res.status(400).json({ error: "size y rooms deben ser números" });
    }

    const estimatedPrice = (size * 2500) + (rooms * 10000);

    res.json({ size, rooms, estimatedPrice });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Run server ---
// Render y Vercel usan la variable de entorno PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`🚀 Backend running on port ${port}`);
});

export default app;
