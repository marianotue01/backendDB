import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Routers
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import userProductRoutes from "./routes/userProducts.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// -------------------------
// Middlewares
// -------------------------
app.use(cors());          // Allow requests from any origin
app.use(express.json());  // Parse incoming JSON requests

// -------------------------
// MongoDB connection
// -------------------------
mongoose
  .connect(process.env.MONGO_URI, { dbName: "store" })  // Use "store" database
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("connected", () => {
  console.log("Current DB:", mongoose.connection.db.databaseName);
});

// -------------------------
// Routes
// -------------------------
app.use("/api/users", userRoutes);           // Routes for users
app.use("/api/products", productRoutes);    // Routes for products
app.use("/api/user-products", userProductRoutes); // Routes for user-product relationships

// -------------------------
// Start server
// -------------------------
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
