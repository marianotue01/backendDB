import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function ProposalManager() {
  const [proposals, setProposals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [cost, setCost] = useState(0);
  const [risk, setRisk] = useState(0);
  const [dependencies, setDependencies] = useState(0);
  const [evaluated, setEvaluated] = useState([]);
  const [showTooltip, setShowTooltip] = useState(null); // tooltip activo

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/proposals`);
      setProposals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createProposal = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/api/proposals`, {
        title,
        description,
        value: Number(value),
        cost: Number(cost),
        risk: Number(risk),
        dependencies: Number(dependencies)
      });
      setTitle("");
      setDescription("");
      setValue(0);
      setCost(0);
      setRisk(0);
      setDependencies(0);
      fetchProposals();
    } catch (err) {
      console.error(err);
    }
  };

  const evaluateProposals = async () => {
    try {
      const res = await axios.post(`${backendURL}/api/evaluate`);
      setEvaluated(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Crear nueva propuesta</h2>
      <form onSubmit={createProposal} style={{ marginBottom: "2rem" }}>
        <label>
          Título:
          <input
            type="text"
            placeholder="Ej: Implementar nueva funcionalidad"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <input
            type="text"
            placeholder="Descripción breve de la propuesta"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Valor (beneficio estimado):
          <input
            type="number"
            placeholder="Ej: 100"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Costo:
          <input
            type="number"
            placeholder="Ej: 50"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Riesgo:
          <input
            type="number"
            placeholder="Ej: 20"
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Dependencias:
          <input
            type="number"
            placeholder="Ej: 2"
            value={dependencies}
            onChange={(e) => setDependencies(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Crear Propuesta</button>
      </form>

      <h2>Propuestas existentes</h2>
      <ul>
        {proposals.map((p) => (
          <li key={p._id}>
            <strong>{p.title}</strong> - {p.description} | Valor: {p.value} | Costo: {p.cost} | Riesgo: {p.risk} | Dependencias: {p.dependencies}
          </li>
        ))}
      </ul>

      <h2>Evaluación y ranking</h2>
      <button onClick={evaluateProposals}>Evaluar Propuestas</button>
      <ol>
        {evaluated.map((p) => (
          <li key={p._id} style={{ position: "relative", marginBottom: "1rem" }}>
            <strong>{p.title}</strong> - Score: {p.score.toFixed(2)}{" "}
            <span
              style={{ marginLeft: "0.5rem", cursor: "pointer", color: "blue", fontWeight: "bold" }}
              onClick={() => setShowTooltip(showTooltip === p._id ? null : p._id)}
            >
              ?
            </span>
            <AnimatePresence>
              {showTooltip === p._id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    left: "2rem",
                    backgroundColor: "#f0f0f0",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    zIndex: 100
                  }}
                >
                  <div><strong>Cálculo:</strong></div>
                  <div>Value: {p.value} × 0.5 = {(p.value * 0.5).toFixed(2)}</div>
                  <div>Cost: {p.cost} × 0.3 = {(p.cost * 0.3).toFixed(2)}</div>
                  <div>Risk: {p.risk} × 0.2 = {(p.risk * 0.2).toFixed(2)}</div>
                  <div><strong>Score: {(p.value * 0.5 - p.cost * 0.3 - p.risk * 0.2).toFixed(2)}</strong></div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ol>
    </div>
  );
}
