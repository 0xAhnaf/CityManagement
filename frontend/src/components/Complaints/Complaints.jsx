import { useState } from "react";
import "./Complaints.css";

const mockComplaints = [
  { _id: "1", title: "Broken streetlight", category: "Infrastructure", status: "pending", user: "Rahim Uddin", date: "2024-04-01" },
  { _id: "2", title: "Garbage not collected", category: "Sanitation", status: "in-progress", user: "Fatema Begum", date: "2024-04-02" },
  { _id: "3", title: "Pothole on main road", category: "Roads", status: "resolved", user: "Karim Sheikh", date: "2024-04-03" },
  { _id: "4", title: "Water supply issue", category: "Utilities", status: "pending", user: "Nasrin Akter", date: "2024-04-04" },
  { _id: "5", title: "Illegal parking", category: "Traffic", status: "in-progress", user: "Sumon Hossain", date: "2024-04-05" },
];

const statusColor = (s) => {
  if (s === "pending") return { bg: "#FEF3C7", color: "#92400E" };
  if (s === "in-progress") return { bg: "#DBEAFE", color: "#1E40AF" };
  if (s === "resolved") return { bg: "#D1FAE5", color: "#065F46" };
  return { bg: "#F3F4F6", color: "#374151" };
};

export default function Complaints() {
  const [complaints, setComplaints] = useState(mockComplaints);

  const updateStatus = (id, status) =>
    setComplaints(complaints.map(c => c._id === id ? { ...c, status } : c));

  return (
    <div className="complaints-wrapper">
      <h1 className="complaints-title">Complaints</h1>
      <p className="complaints-sub">Review and update complaint statuses</p>

      <div className="complaints-table-wrapper">
        <table className="complaints-table">
          <thead>
            <tr className="complaints-thead-row">
              {["Title", "Category", "Submitted by", "Date", "Status", "Action"].map(h => (
                <th key={h} className="complaints-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complaints.map(c => (
              <tr key={c._id} className="complaints-row">
                <td className="complaints-td td-title">{c.title}</td>
                <td className="complaints-td td-muted">{c.category}</td>
                <td className="complaints-td td-muted">{c.user}</td>
                <td className="complaints-td td-faint">{c.date}</td>
                <td className="complaints-td">
                  <span
                    className="complaints-badge"
                    style={statusColor(c.status)}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="complaints-td">
                  <select
                    value={c.status}
                    onChange={e => updateStatus(c._id, e.target.value)}
                    className="complaints-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}