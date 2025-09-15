import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProposalManager() {
  const [proposals, setProposals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [cost, setCost] = useState(0);
  const [risk, setRisk] = useState(0);
  const [dependencies, setDependencies] = useState(0);
  const [evaluated, setEvaluated] = useState([]);
  const [showCalc, setShowCalc] = useState({}); // controla qué cálculos mostrar

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

  const toggleCalc = (id) => {
    setShowCalc((prev) => ({ ...prev, [id]: !prev[id] }));
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
        <button type="submit">Crear Propues66ta</button>
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
      <button onClick={evaluateProposals}>Evaluar Propuestas 34</button>
      <ol>
        {evaluated.map((p) => (
          <li key={p._id}>
            <strong>{p.title}</strong> - Score: {p.score.toFixed(2)}{" "}
            <span
              style={{ cursor: "pointer", color: "blue", marginLeft: "5px" }}
              onClick={() => toggleCalc(p._id)}
            >
              ?
            </span>
            {showCalc[p._id] && (
              <div style={{ fontSize: "0.9em", color: "#555" }}>
                Cálculo: {p.value}*0.5 - {p.cost}*0.3 - {p.risk}*0.2 = {p.score.toFixed(2)}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
