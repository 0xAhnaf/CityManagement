import React, { useEffect, useState } from "react";
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

  // check if already enrolled when page loads
  useEffect(() => {
    checkEnrollment();
  }, []);

  const checkEnrollment = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/app/volunteers/check/${vcard._id}`,
        { withCredentials: true },
      );

      setEnrolled(res.data.enrolled);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnroll = async () => {
    try {
      await axios.post(
        "http://localhost:8000/app/volunteers",
        { eventId: vcard._id },
        { withCredentials: true },
      );

      setEnrolled(true);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div className="Vol-card">
      <div className="icon-box">
        <FontAwesomeIcon icon={iconMap[vcard.type]} />
      </div>

      <h2>{vcard.type}</h2>
      <p>{vcard.description}</p>

      <p>
        <h4>Location</h4> {vcard.location}
      </p>
      <p>
        <h4>Date</h4>
        {vcard.date}
      </p>
      <p>
        <h4>Time</h4> {vcard.time}
      </p>

      <button
        className={`vol-btn ${enrolled ? "enrolled" : ""}`}
        onClick={handleEnroll}
        disabled={enrolled}
      >
        {enrolled ? "Enrolled" : "Enroll me"}
      </button>
    </div>
  );
}

export default VolunteerCard;
