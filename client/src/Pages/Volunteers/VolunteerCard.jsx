import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTree,
  faPersonCane,
  faHouseFlag,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import "./VolunteerCard.css";
import axios from "axios";

function VolunteerCard({ vcard }) {
  const iconMap = {
    Environmental: faTree,
    Senior: faPersonCane,
    Community: faHouseFlag,
    Educational: faGraduationCap,
  };

  const [enrolled, setEnrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ phone: "", age: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    checkEnrollment();
  }, []);

  const checkEnrollment = async () => {
    try {
      const res = await axios.get(
        `https://citymanagement-backend.onrender.com/app/volunteers/check/${vcard._id}`,
        { withCredentials: true }
      );
      setEnrolled(res.data.enrolled);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnroll = async () => {
    setError("");
    if (!formData.phone || !formData.age) {
      setError("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "https://citymanagement-backend.onrender.com/app/volunteers",
        { eventId: vcard._id, phone: formData.phone, age: formData.age },
        { withCredentials: true }
      );
      setEnrolled(true);
      setShowPopup(false);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

 return (
  <>
    {/* Popup is now OUTSIDE the card */}
    {showPopup && (
      <div className="popup-overlay" onClick={() => setShowPopup(false)}>
        <div className="popup-box" onClick={(e) => e.stopPropagation()}>
          <h3>Complete Enrollment</h3>
          <p>Just a few details before you join!</p>
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
          {error && <p className="popup-error">{error}</p>}
          <div className="popup-actions">
            <button className="popup-cancel" onClick={() => setShowPopup(false)}>Cancel</button>
            <button className="popup-submit" onClick={handleEnroll}>Confirm Enroll</button>
          </div>
        </div>
      </div>
    )}

    {/* Card */}
    <div className="Vol-card">
      <div className="icon-box">
        <FontAwesomeIcon icon={iconMap[vcard.type]} />
      </div>
      <h2>{vcard.type}</h2>
      <p>{vcard.description}</p>
      <p><h4>Location</h4>{vcard.location}</p>
      <p><h4>Date</h4>{vcard.date}</p>
      <p><h4>Time</h4>{vcard.time}</p>
      <button
        className={`vol-btn ${enrolled ? "enrolled" : ""}`}
        onClick={() => !enrolled && setShowPopup(true)}
        disabled={enrolled}
      >
        {enrolled ? "Enrolled ✓" : "Enroll me"}
      </button>
    </div>
  </>
);
}

export default VolunteerCard;
