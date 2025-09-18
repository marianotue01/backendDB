import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },           // Nombre del producto
  description: { type: String, default: "" },      // Descripción opcional
  price: { type: Number, required: true },         // Precio
  category: { type: String, required: true },      // Categoría del producto
  stock: { type: Number, default: 0 },             // Cantidad disponible
  sku: { type: String, unique: true, required: true }, // Código único (SKU)
  active: { type: Boolean, default: true }         // Producto activo/inactivo
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
