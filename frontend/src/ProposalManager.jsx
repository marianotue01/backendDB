import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000/api"; // Cambiar si deploy en Render

const ProposalManager = () => {
  const [proposals, setProposals] = useState([]);
  const [form, setForm] = useState({ title:"", description:"", value:0, cost:0, risk:0, dependencies:0 });
  const [evaluated, setEvaluated] = useState([]);

  const fetchProposals = async () => {
    const res = await axios.get(`${API_BASE}/proposals`);
    setProposals(res.data);
  };

  useEffect(() => { fetchProposals(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/proposals`, form);
    setForm({ title:"", description:"", value:0, cost:0, risk:0, dependencies:0 });
    fetchProposals();
  };

  const handleEvaluate = async () => {
    const res = await axios.post(`${API_BASE}/evaluate`);
    setEvaluated(res.data);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding:"20px" }}>
      <h1>Evaluador de Propuestas</h1>

      <form onSubmit={handleCreate}>
        <input placeholder="Título" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input placeholder="Descripción" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <input type="number" placeholder="Valor" value={form.value} onChange={e=>setForm({...form,value:Number(e.target.value)})} />
        <input type="number" placeholder="Costo" value={form.cost} onChange={e=>setForm({...form,cost:Number(e.target.value)})} />
        <input type="number" placeholder="Riesgo" value={form.risk} onChange={e=>setForm({...form,risk:Number(e.target.value)})} />
        <input type="number" placeholder="Dependencias" value={form.dependencies} onChange={e=>setForm({...form,dependencies:Number(e.target.value)})} />
        <button type="submit">Agregar propuesta</button>
      </form>

      <button onClick={handleEvaluate} style={{ marginTop:"10px" }}>Evaluar Propuestas</button>

      <h2>Ranking</h2>
      <ul>
        {evaluated.map(p => (
          <li key={p._id}>{p.title} — Score: {p.score.toFixed(2)}</li>
        ))}
      </ul>

      <h2>Listado</h2>
      <ul>
        {proposals.map(p => (
          <li key={p._id}>{p.title} — Valor:{p.value}, Costo:{p.cost}, Riesgo:{p.risk}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProposalManager;
