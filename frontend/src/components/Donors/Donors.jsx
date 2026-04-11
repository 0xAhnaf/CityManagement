import { useState, useEffect } from "react";
import "./Donors.css";
import api from "../../utils/AxiosInstance";
import toast from "react-hot-toast";

export default function Donors() {
  const [donors, setDonors]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [filterBlood, setFilterBlood] = useState("all");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const { data } = await api.get("/donors");
        setDonors(data);
      } catch (err) {
        toast.error("Failed to load donors.");
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const bloodGroups = ["all", ...new Set(donors.map(d => d.bloodGroup))];
  const filteredDonors = filterBlood === "all"
    ? donors
    : donors.filter(d => d.bloodGroup === filterBlood);

  if (loading) return <p>Loading donors...</p>;

  return (
    <div className="donors-wrapper">
      <h1 className="donors-title">Blood donors</h1>
      <p className="donors-sub">Filter and manage blood donor registry</p>

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

      <div className="donors-table-wrapper">
        <table className="donors-table">
          <thead>
            <tr className="donors-thead-row">
              {["Name", "Blood group", "Phone", "District", "Age", "Last donated", "Availability", "Registered on"].map(h => (
                <th key={h} className="donors-th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDonors.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "24px" }}>
                  No donors found.
                </td>
              </tr>
            ) : (
              filteredDonors.map(d => (
                <tr key={d._id} className="donors-row">
                  <td className="donors-td td-title">{d.name}</td>
                  <td className="donors-td">
                    <span className="blood-badge">{d.bloodGroup}</span>
                  </td>
                  <td className="donors-td td-muted">{d.phone}</td>
                  <td className="donors-td td-muted">{d.district}</td>
                  <td className="donors-td td-muted">{d.age}</td>
                  <td className="donors-td td-faint">
                    {d.lastDonated
                      ? new Date(d.lastDonated).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="donors-td">
                     <span className={`availability-badge ${d.available !== false ? "available" : "unavailable"}`}>
                        {d.available !== false ? "Available" : "Unavailable"}
                     </span>
                  </td>
                  <td className="donors-td td-faint">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}