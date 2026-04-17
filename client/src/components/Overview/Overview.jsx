import { useEffect, useState } from "react";
import api from "../../utils/AxiosInstance";
import "./Overview.css";

const statusColor = (s) => {
  if (s === "pending") return { bg: "#FEF3C7", color: "#92400E" };
  if (s === "in-progress") return { bg: "#DBEAFE", color: "#1E40AF" };
  if (s === "resolved") return { bg: "#D1FAE5", color: "#065F46" };
  return { bg: "#F3F4F6", color: "#374151" };
};

export default function Overview() {
  const [complaints, setComplaints] = useState([]);
  const [events, setEvents] = useState([]);
  const [donorCount, setDonorCount] = useState(0);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [complaintsRes, eventsRes, donorsRes] = await Promise.allSettled([
        api.get("/complaint/list"),
        api.get("/api/events"),
        api.get("/donors", { params: { available: true } }),
      ]);

      if (complaintsRes.status === "fulfilled") setComplaints(complaintsRes.value.data);
      if (eventsRes.status === "fulfilled") setEvents(eventsRes.value.data);
      if (donorsRes.status === "fulfilled") setDonorCount(donorsRes.value.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "pending").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  const stats = [
    { label: "Total complaints", value: total, accent: "#3B82F6" },
    { label: "Pending", value: pending, accent: "#F59E0B" },
    { label: "Resolved", value: resolved, accent: "#10B981" },
    { label: "Total events", value: events.length, accent: "#0EA5E9" },
    { label: "Available donors", value: donorCount, accent: "#EF4444" },
  ];

  const recentComplaints = complaints.slice(0, 4);

  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  return (
    <div className="overview-wrapper">
      <h1 className="overview-title">Overview</h1>
      <p className="overview-sub">City management at a glance</p>

      <div className="overview-stats">
        {stats.map((s) => (
          <div
            key={s.label}
            className="stat-card"
            style={{ borderTop: `3px solid ${s.accent}` }}
          >
            <span className="stat-label">{s.label}</span>
            <span className="stat-value">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="overview-panels">
        <div className="overview-panel">
          <div className="panel-heading">Recent complaints</div>
          {recentComplaints.length === 0 ? (
            <p className="panel-empty">No complaints yet.</p>
          ) : (
            recentComplaints.map((c) => (
              <div key={c._id} className="panel-row">
                <div className="panel-row-left">
                  <span className="panel-row-title">{c.title}</span>
                  <span className="panel-row-sub">
                    {c.user ?? "Unknown"} · {c.date?.slice(0, 10)}
                  </span>
                </div>
                <span className="badge" style={statusColor(c.status)}>
                  {c.status}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="overview-panel">
          <div className="panel-heading">Upcoming events</div>
          {upcomingEvents.length === 0 ? (
            <p className="panel-empty">No events yet.</p>
          ) : (
            upcomingEvents.map((e) => (
              <div key={e._id} className="panel-row">
                <div className="panel-row-left">
                  <span className="panel-row-title">{e.type}</span>
                  <span className="panel-row-sub">
                    {e.date} · {e.location}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}