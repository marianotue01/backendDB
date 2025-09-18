import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { swaggerUi, swaggerSpec } from "./swagger.js";

import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import userProductRoutes from "./routes/userProducts.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "store" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user-products", userProductRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
