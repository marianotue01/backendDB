import mongoose from "mongoose";

const UserProductSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  
  // Metadata opcional de la relación
  purchasedAt: { type: Date, default: Date.now }, // Fecha de compra
  quantity: { type: Number, default: 1 },         // Cantidad de productos
  status: {                                       // Estado de la relación (ej. “comprado”, “wishlist”, “devuelto”)
    type: String,
    enum: ["purchased", "wishlist", "returned"],
    default: "purchased"
  }
}, { timestamps: true });

// Evitar duplicados (un usuario no puede tener dos veces el mismo producto con mismo status)
UserProductSchema.index({ userId: 1, productId: 1, status: 1 }, { unique: true });

export default mongoose.model("UserProduct", UserProductSchema);
