import React from "react";
import "./VolunteerPage.css";
import Navbar from "../../NavBar/Navbar";
import VolunteerCard from "./VolunteerCard";
import Footer from "../../Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function VolunteerPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/events");
        setEvents(res.data);
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="Volunteer_bg">
        <div className="head_line">
          <h3>Make a Difference</h3>
          <h3 className="green">In Your City</h3>
          <p>
            Join thousands of citizens shaping the future of our urban
            landscape. Choose a category below and start your journey as
            vilunteer today
          </p>
        </div>
        <div className="card">
          {events.map((event) => (
            <VolunteerCard vcard={event} key={event._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VolunteerPage;
