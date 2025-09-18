import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },   // Nombre
  lastName: { type: String, required: true },    // Apellido
  document: { type: String, unique: true, required: true }, // DNI / Pasaporte
  address: { type: String, required: true },     // Dirección
  city: { type: String, required: true },        // Ciudad
  country: { type: String, required: true },     // País
  birthDate: { type: Date, required: true },     // Fecha de nacimiento
  email: { type: String, unique: true, required: true },    // Email
}, { timestamps: true });

export default mongoose.model("User", UserSchema);