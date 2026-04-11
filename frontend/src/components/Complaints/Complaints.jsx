import { useState } from "react";
import "./Complaints.css";
import axiosInstance from "../../utils/AxiosInstance";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const mockComplaints = [
  {
    _id: "1",
    title: "Broken streetlight",
    category: "Infrastructure",
    status: "pending",
    user: "Rahim Uddin",
    date: "2024-04-01",
  },
  {
    _id: "2",
    title: "Garbage not collected",
    category: "Sanitation",
    status: "in-progress",
    user: "Fatema Begum",
    date: "2024-04-02",
  },
  {
    _id: "3",
    title: "Pothole on main road",
    category: "Roads",
    status: "resolved",
    user: "Karim Sheikh",
    date: "2024-04-03",
  },
  {
    _id: "4",
    title: "Water supply issue",
    category: "Utilities",
    status: "pending",
    user: "Nasrin Akter",
    date: "2024-04-04",
  },
  {
    _id: "5",
    title: "Illegal parking",
    category: "Traffic",
    status: "in-progress",
    user: "Sumon Hossain",
    date: "2024-04-05",
  },
];

const statusColor = (s) => {
  if (s === "pending") return { bg: "#FEF3C7", color: "#92400E" };
  if (s === "in-progress") return { bg: "#DBEAFE", color: "#1E40AF" };
  if (s === "resolved") return { bg: "#D1FAE5", color: "#065F46" };
  return { bg: "#F3F4F6", color: "#374151" };
};

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    setComplaints(prev => prev.filter(c => c._id !== id));
    setShowModal(false);
    try {
      await axiosInstance.delete(`/complaint/list/${id}`);
    } catch (err) {
      console.error(err);
    }
  }

  const updateStatus = async (id, status) => {
    // optimistic UI update
    setComplaints((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status } : c)),
    );

    try {
      await axiosInstance.put(`/complaint/list/${id}`, { status });
    } catch (err) {
      console.error(err);

      // rollback if failed
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: "previous_status" } : c,
        ),
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/complaint/list");
        setComplaints(response.data);
      } catch (error) {
        console.log("Error updating complaint", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="complaints-wrapper">
      <h1 className="complaints-title">Complaints</h1>
      <p className="complaints-sub">Review and update complaint statuses</p>

      <div className="complaints-table-wrapper">
        <table className="complaints-table">
          <thead>
            <tr className="complaints-thead-row">
              {[
                "Title",
                "Category",
                "Submitted by",
                "Date",
                "Status",
                "Action",
              ].map((h) => (
                <th key={h} className="complaints-th">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr
                key={c._id}
                className="complaints-row"
                onClick={() => handleRowClick(c)}
                style={{ cursor: "pointer" }}
              >
                <td className="complaints-td td-title">{c.title}</td>
                <td className="complaints-td td-muted">{c.category}</td>
                <td className="complaints-td td-muted">{c.user}</td>
                <td className="complaints-td td-faint">
                  {new Date(c.date).toLocaleDateString()}
                </td>
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
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateStatus(c._id, e.target.value)}
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
        {showModal && selectedComplaint && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedComplaint.title}</h2>

              <p>
                <strong>Category:</strong> {selectedComplaint.category}
              </p>
              <p>
                <strong>User:</strong> {selectedComplaint.user}
              </p>
              <p>
                <strong>Status:</strong> {selectedComplaint.status}
              </p>
              <p>
                <strong>Urgency:</strong> {selectedComplaint.urgency}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedComplaint.date).toLocaleString()}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {selectedComplaint.location?.address || "N/A"}
              </p>
              <p>
                <strong>Description:</strong> {selectedComplaint.description}
              </p>

              {/* Evidence images */}
              <div className="evidence-container">
                {selectedComplaint.evidence?.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt="evidence"
                    className="evidence-image"
                  />
                ))}
              </div>

              {selectedComplaint?.location?.lat && (
                <div className="map-container">
                  <MapContainer
                    key={selectedComplaint._id} // 👈 important fix
                    center={[
                      selectedComplaint.location.lat,
                      selectedComplaint.location.lng,
                    ]}
                    zoom={14}
                    style={{
                      height: "250px",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker
                      position={[
                        selectedComplaint.location.lat,
                        selectedComplaint.location.lng,
                      ]}
                    >
                      <Popup>
                        <strong>{selectedComplaint.title}</strong>
                        <br />
                        {selectedComplaint.location.address}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              )}

              <div className="modal-footer-buttons">
                <button onClick={() => setShowModal(false)}>Close</button>
                <button onClick={() => handleDelete(selectedComplaint._id)}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
