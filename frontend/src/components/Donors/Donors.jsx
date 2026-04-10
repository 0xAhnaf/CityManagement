import { useState } from "react";
import "./Donors.css";

const mockDonors = [
  { _id: "1", name: "Jahangir Alam", bloodGroup: "A+", phone: "01811111111", area: "Kishorganj Sadar", lastDonated: "2024-01-10", available: true },
  { _id: "2", name: "Roksana Begum", bloodGroup: "B+", phone: "01822222222", area: "Nikli", lastDonated: "2023-11-05", available: true },
  { _id: "3", name: "Tariq Ahmed", bloodGroup: "O+", phone: "01833333333", area: "Austagram", lastDonated: "2024-02-20", available: false },
  { _id: "4", name: "Sharmin Sultana", bloodGroup: "AB-", phone: "01844444444", area: "Mithamain", lastDonated: "2024-03-01", available: true },
  { _id: "5", name: "Kabir Hossain", bloodGroup: "O-", phone: "01855555555", area: "Bajitpur", lastDonated: "2023-12-15", available: true },
];

export default function Donors() {
  const [donors] = useState(mockDonors);
  const [filterBlood, setFilterBlood] = useState("all");

  const bloodGroups = ["all", ...new Set(donors.map(d => d.bloodGroup))];
  const filteredDonors = filterBlood === "all" ? donors : donors.filter(d => d.bloodGroup === filterBlood);

  return (
    <div className="donors-wrapper">
      <h1 className="donors-title">Blood donors</h1>
      <p className="donors-sub">Filter and manage blood donor registry</p>

      {/* Blood group filter */}
      <div className="donors-filters">
        {bloodGroups.map(bg => (
          <button
            key={bg}
            onClick={() => setFilterBlood(bg)}
            className={`donors-filter-btn ${filterBlood === bg ? "active" : ""}`}
          >
            {bg === "all" ? "All groups" : bg}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="donors-table-wrapper">
        <table className="donors-table">
          <thead>
            <tr className="donors-thead-row">
              {["Name", "Blood group", "Phone", "Area", "Last donated", "Available"].map(h => (
                <th key={h} className="donors-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDonors.map(d => (
              <tr key={d._id} className="donors-row">
                <td className="donors-td td-title">{d.name}</td>
                <td className="donors-td">
                  <span className="blood-badge">{d.bloodGroup}</span>
                </td>
                <td className="donors-td td-muted">{d.phone}</td>
                <td className="donors-td td-muted">{d.area}</td>
                <td className="donors-td td-faint">{d.lastDonated}</td>
                <td className="donors-td">
                  <div className="donors-available">
                    <span className={`donors-dot ${d.available ? "dot-green" : "dot-red"}`} />
                    <span className={d.available ? "text-green" : "text-red"}>
                      {d.available ? "Yes" : "No"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}