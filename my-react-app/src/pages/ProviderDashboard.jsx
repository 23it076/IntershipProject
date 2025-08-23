// src/pages/ProviderDashboard.jsx
import { useEffect, useState } from "react";
import API from "../services/Api";

export default function ProviderDashboard() {
  const status = localStorage.getItem("providerStatus") || "approved";
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", location: "", description: "" });

  useEffect(() => {
    if (status === "approved") {
      API.get("/provider/jobs").then(r => setJobs(r.data));
    }
  }, [status]);

  const createJob = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/provider/jobs", form);
    setJobs([data, ...jobs]);
    setForm({ title: "", location: "", description: "" });
  };

  if (status === "pending") return <p className="p-6 text-yellow-700">Your provider request is under review.</p>;
  if (status === "rejected") return <p className="p-6 text-red-600">Your provider request was rejected by admin.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>

      {/* Job Creation Form */}
      <div className="bg-white shadow rounded p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create a New Job</h2>
        <form onSubmit={createJob} className="flex flex-col md:flex-row gap-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded flex-1"
            required
          />
          <input
            placeholder="Location"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="border p-2 rounded flex-1"
            required
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded flex-1"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Job
          </button>
        </form>
      </div>

      {/* Jobs List */}
      <h2 className="text-2xl font-semibold mb-4">Your Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(j => (
            <div key={j._id} className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold">{j.title}</h3>
              <p className="text-gray-500">{j.location}</p>
              <p className="mt-2 text-gray-700">{j.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
