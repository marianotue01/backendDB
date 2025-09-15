import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";

export default function ProposalManager() {
  const [proposals, setProposals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [cost, setCost] = useState(0);
  const [risk, setRisk] = useState(0);
  const [dependencies, setDependencies] = useState(0);
  const [evaluated, setEvaluated] = useState([]);
  const [showCalc, setShowCalc] = useState(null);

  const backendURL = process.env.REACT_APP_BACKEND_URL.replace(/\/+$/, "");

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
        dependencies: Number(dependencies),
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
    setShowCalc(showCalc === id ? null : id);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Crear nueva propuesta</h2>
      <form
        onSubmit={createProposal}
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        {[
          { label: "Título", value: title, setter: setTitle },
          { label: "Descripción", value: description, setter: setDescription },
          { label: "Valor", value: value, setter: setValue },
          { label: "Costo", value: cost, setter: setCost },
          { label: "Riesgo", value: risk, setter: setRisk },
          { label: "Dependencias", value: dependencies, setter: setDependencies },
        ].map((field) => (
          <div key={field.label} style={{ display: "flex", flexDirection: "column" }}>
            <label>{field.label}</label>
            <input
              type={field.label === "Descripción" ? "text" : "number"}
              placeholder={`Ingrese ${field.label.toLowerCase()}`}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              required
            />
          </div>
        ))}
        <div style={{ alignSelf: "flex-end" }}>
          <button type="submit">Crear Propuesta</button>
        </div>
      </form>

      <h2>Propuestas existentes</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "2rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Título</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Descripción</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Valor</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Costo</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Riesgo</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Dependencias</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((p) => (
            <tr key={p._id} style={{ textAlign: "center" }}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{p.title}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{p.description}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{p.value}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{p.cost}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{p.risk}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{p.dependencies}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Evaluación y ranking</h2>
      <button onClick={evaluateProposals}>Evaluar Propuestas</button>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>#</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Título</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Score</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {evaluated.map((p, idx) => (
            <tr key={p._id} style={{ textAlign: "center" }}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{idx + 1}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{p.title}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{p.score.toFixed(2)}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                <FaInfoCircle
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleCalc(p._id)}
                />
                {showCalc === p._id && (
                  <div>
                    Score calculado: ({p.value}*0.5 - {p.cost}*0.3 - {p.risk}*0.2)
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
