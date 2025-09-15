import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaQuestionCircle } from "react-icons/fa";

export default function ProposalManager() {
  const [proposals, setProposals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [cost, setCost] = useState(0);
  const [risk, setRisk] = useState(0);
  const [dependencies, setDependencies] = useState(0);
  const [evaluated, setEvaluated] = useState([]);
  const [showCalc, setShowCalc] = useState({});

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
        dependencies: Number(dependencies),
      });
      setTitle(""); setDescription(""); setValue(0); setCost(0); setRisk(0); setDependencies(0);
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

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const thStyle = {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "12px",
    textAlign: "center",
    fontWeight: "bold",
  };

  const tdStyle = {
    padding: "10px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
  };

  const headerRowStyle = {
    backgroundColor: "#4f46e5",
  };

  const inputStyle = {
    padding: "8px",
    textAlign: "center",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  };

  const formContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "1rem",
    marginBottom: "2rem",
    alignItems: "center",
  };

  const formLabelStyle = {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "0.25rem",
  };

  const buttonStyle = {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "1rem" }}>Crear nueva propuesta</h2>
      <form onSubmit={createProposal} style={formContainerStyle}>
        <div>
          <div style={formLabelStyle}>Título</div>
          <input style={inputStyle} placeholder="Ej: Nueva funcionalidad" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <div style={formLabelStyle}>Descripción</div>
          <input style={inputStyle} placeholder="Descripción breve" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <div style={formLabelStyle}>Valor</div>
          <input style={inputStyle} type="number" placeholder="Ej: 100" value={value} onChange={(e) => setValue(e.target.value)} required />
        </div>
        <div>
          <div style={formLabelStyle}>Costo</div>
          <input style={inputStyle} type="number" placeholder="Ej: 50" value={cost} onChange={(e) => setCost(e.target.value)} required />
        </div>
        <div>
          <div style={formLabelStyle}>Riesgo</div>
          <input style={inputStyle} type="number" placeholder="Ej: 20" value={risk} onChange={(e) => setRisk(e.target.value)} required />
        </div>
        <div>
          <div style={formLabelStyle}>Dependencias</div>
          <input style={inputStyle} type="number" placeholder="Ej: 2" value={dependencies} onChange={(e) => setDependencies(e.target.value)} required />
        </div>
        <div style={{ gridColumn: "span 6", textAlign: "left" }}>
          <button type="submit" style={buttonStyle}>Crear Propuesta</button>
        </div>
      </form>

      <h2>Propuestas existentes</h2>
      <table style={tableStyle}>
        <thead style={headerRowStyle}>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Título</th>
            <th style={thStyle}>Descripción</th>
            <th style={thStyle}>Valor</th>
            <th style={thStyle}>Costo</th>
            <th style={thStyle}>Riesgo</th>
            <th style={thStyle}>Dependencias</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((p, index) => (
            <tr key={p._id}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{p.title}</td>
              <td style={tdStyle}>{p.description}</td>
              <td style={tdStyle}>{p.value}</td>
              <td style={tdStyle}>{p.cost}</td>
              <td style={tdStyle}>{p.risk}</td>
              <td style={tdStyle}>{p.dependencies}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Evaluación y ranking</h2>
      <button onClick={evaluateProposals} style={buttonStyle}>Evaluar Propuestas</button>
      <table style={tableStyle}>
        <thead style={headerRowStyle}>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Título</th>
            <th style={thStyle}>Score</th>
            <th style={thStyle}>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {evaluated.map((p, index) => (
            <tr key={p._id}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{p.title}</td>
              <td style={tdStyle}>{p.score.toFixed(2)}</td>
              <td style={tdStyle}>
                <FaQuestionCircle style={{ cursor: "pointer", color: "#4f46e5" }} onClick={() => toggleCalc(p._id)} />
                {showCalc[p._id] && (
                  <div style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
                    Score = {p.value}*0.5 - {p.cost}*0.3 - {p.risk}*0.2
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
