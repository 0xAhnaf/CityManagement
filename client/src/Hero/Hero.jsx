import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { faTint, faUsers } from "@fortawesome/free-solid-svg-icons";
import "./Hero.css";

import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero nanbar">
      <div className="Hero-text">
        <h1>Your City,Connected</h1>
        <p className="hero-text-desc">
          Access municipal services, stay updated with local news, and
          contribute to your community through one central portal.
        </p>
        <div className="Options">
          <div className="box report">
            <div className="icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <h2>Report a Problem</h2>
            <h4>
             Notice something that needs fixing in your neighborhood? Report issues quickly so the city can take action.
            </h4>
            <ul>
              <li>Street Light Repairs</li>
              <li>Road Maintenance</li>
              <li>Sanitation Issues</li>
            </ul>
            <button onClick={() => navigate("/ReportPage")}>
              Send a Report
            </button>
          </div>
          <div className="box Blood">
            <div className="icon">
              <FontAwesomeIcon icon={faTint} />
            </div>
            <h2>Blood Donation</h2>
            <h4>
              Save lives by contributing to a reliable blood supply in your community.
            </h4>
            <ul>
              <li>Donate Blood</li>
              <li>Emergency Requests</li>
              <li>Rare Blood Group Registry</li>
            </ul>
            <button onClick={() => navigate("/BloodDonation")}>
              Find Opportunities
            </button>
          </div>
          <div className="box Volunteer">
            <div className="icon">
              <FontAwesomeIcon icon={faWrench} />
            </div>
            <h2>Volunteer</h2>
            <h4>
              Join hands with your community and help make your city cleaner, safer, and more connected.
            </h4>
            <ul>
              <li>Park Cleanups</li>
              <li>Senior Support</li>
              <li>Youth Mentoring</li>
            </ul>
            <button onClick={() => navigate("/VolunteerPage")}>
              Find Opportunities
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Hero;
