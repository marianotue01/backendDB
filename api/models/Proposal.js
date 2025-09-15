import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  title: String,
  description: String,
  value: Number,         // Valor de negocio
  cost: Number,          // Costo estimado
  risk: Number,          // Riesgo
  dependencies: Number   // Cantidad de dependencias
});

export default mongoose.model("Proposal", proposalSchema);
