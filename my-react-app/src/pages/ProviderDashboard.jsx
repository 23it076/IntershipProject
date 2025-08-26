// src/pages/ProviderDashboard.jsx
import { useEffect, useState } from "react";
import API from "../services/Api";
import "./admindashboard.css";

export default function ProviderDashboard() {
  const status = localStorage.getItem("providerStatus") || "approved";
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (status !== "approved") return;
    const load = async () => {
      const [p, a, r] = await Promise.all([
        API.get("/provider/jobs?status=pending"),
        API.get("/provider/jobs?status=approved"),
        API.get("/provider/jobs?status=rejected"),
      ]);
      setPending(p.data || []);
      setApproved(a.data || []);
      setRejected(r.data || []);
    };
    load();
  }, [status]);

  const search = async (e) => {
    e.preventDefault();
    const { data } = await API.get(`/provider/jobs/search?q=${encodeURIComponent(query)}`);
    setPending(data || []);
  };

  const approve = async (id) => {
    const { data } = await API.patch(`/provider/jobs/${id}/approve`);
    setPending((l) => l.filter((j) => j._id !== id));
    setApproved((l) => [data, ...l]);
  };

  const reject = async (id) => {
    const { data } = await API.patch(`/provider/jobs/${id}/reject`);
    setPending((l) => l.filter((j) => j._id !== id));
    setRejected((l) => [data, ...l]);
  };

  if (status === "pending") return <p className="p-6 text-yellow-700">Your provider request is under review.</p>;
  if (status === "rejected") return <p className="p-6 text-red-600">Your provider request was rejected by admin.</p>;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Provider Dashboard</h1>

      {/* Search pending jobs created by users */}
      <div className="experience-card" style={{ maxWidth: 900, margin: "0 auto 20px" }}>
        <form onSubmit={search} style={{ display: 'flex', gap: 10 }}>
          <input
            placeholder="Search user jobs by title, company or location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded flex-1"
            style={{ flex: 1 }}
          />
          <button className="delete-btn" style={{ background: '#2563eb' }}>Search</button>
        </form>
      </div>

      <h2 className="section-title">Pending Jobs</h2>
      <div className="experience-list">
        {pending.map((j) => (
          <div key={j._id} className="experience-card">
            <div className="name">{j.title}</div>
            <div className="meta">{j.company} • {j.location}</div>
            <p style={{ marginTop: 8 }}>{j.description}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn-approve btn" onClick={() => approve(j._id)}>Approve</button>
              <button className="btn-reject btn" onClick={() => reject(j._id)}>Reject</button>
            </div>
          </div>
        ))}
        {pending.length === 0 && <p className="empty-text">No pending jobs.</p>}
      </div>

      <h2 className="section-title">Approved Jobs</h2>
      <div className="experience-list">
        {approved.map((j) => (
          <div key={j._id} className="experience-card">
            <div className="name">{j.title}</div>
            <div className="meta">{j.company} • {j.location}</div>
            <p style={{ marginTop: 8 }}>{j.description}</p>
          </div>
        ))}
        {approved.length === 0 && <p className="empty-text">No approved jobs.</p>}
      </div>

      <h2 className="section-title">Rejected Jobs</h2>
      <div className="experience-list">
        {rejected.map((j) => (
          <div key={j._id} className="experience-card">
            <div className="name">{j.title}</div>
            <div className="meta">{j.company} • {j.location}</div>
            <p style={{ marginTop: 8 }}>{j.description}</p>
          </div>
        ))}
        {rejected.length === 0 && <p className="empty-text">No rejected jobs.</p>}
      </div>
    </div>
  );
}
