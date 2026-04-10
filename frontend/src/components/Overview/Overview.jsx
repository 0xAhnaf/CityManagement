import "./Overview.css";

const mockComplaints = [
  { _id: "1", title: "Broken streetlight", user: "Rahim Uddin", date: "2024-04-01", status: "pending" },
  { _id: "2", title: "Garbage not collected", user: "Fatema Begum", date: "2024-04-02", status: "in-progress" },
  { _id: "3", title: "Pothole on main road", user: "Karim Sheikh", date: "2024-04-03", status: "resolved" },
  { _id: "4", title: "Water supply issue", user: "Nasrin Akter", date: "2024-04-04", status: "pending" },
];

const mockEvents = [
  { _id: "1", title: "City Cleanliness Drive", date: "2024-05-10", location: "Kishorganj Sadar", volunteers: [1, 2] },
  { _id: "2", title: "Blood Donation Camp", date: "2024-05-18", location: "District Hospital", volunteers: [1] },
  { _id: "3", title: "Tree Plantation Program", date: "2024-06-05", location: "Narshunda River Bank", volunteers: [] },
];

const stats = [
  { label: "Total complaints", value: 5, accent: "#3B82F6" },
  { label: "Pending", value: 2, accent: "#F59E0B" },
  { label: "Resolved", value: 1, accent: "#10B981" },
  { label: "Active volunteers", value: 2, accent: "#8B5CF6" },
  { label: "Available donors", value: 4, accent: "#EF4444" },
  { label: "Total events", value: 3, accent: "#0EA5E9" },
];

const statusColor = (s) => {
  if (s === "pending") return { bg: "#FEF3C7", color: "#92400E" };
  if (s === "in-progress") return { bg: "#DBEAFE", color: "#1E40AF" };
  if (s === "resolved") return { bg: "#D1FAE5", color: "#065F46" };
  return { bg: "#F3F4F6", color: "#374151" };
};

export default function Overview() {
  return (
    <div className="overview-wrapper">
      <h1 className="overview-title">Overview</h1>
      <p className="overview-sub">City management at a glance</p>

      {/* Stat cards */}
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

      {/* Bottom two panels */}
      <div className="overview-panels">

        {/* Recent complaints */}
        <div className="overview-panel">
          <div className="panel-heading">Recent complaints</div>
          {mockComplaints.map((c) => (
            <div key={c._id} className="panel-row">
              <div className="panel-row-left">
                <span className="panel-row-title">{c.title}</span>
                <span className="panel-row-sub">{c.user} · {c.date}</span>
              </div>
              <span
                className="badge"
                style={statusColor(c.status)}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>

        {/* Upcoming events */}
        <div className="overview-panel">
          <div className="panel-heading">Upcoming events</div>
          {mockEvents.length === 0 ? (
            <p className="panel-empty">No events yet.</p>
          ) : (
            mockEvents.map((e) => (
              <div key={e._id} className="panel-row">
                <div className="panel-row-left">
                  <span className="panel-row-title">{e.title}</span>
                  <span className="panel-row-sub">
                    {e.date} · {e.location} · {e.volunteers.length} volunteer{e.volunteers.length !== 1 ? "s" : ""}
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