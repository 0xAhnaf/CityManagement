import "./VolunteerForm.css";
import Footer from "../../Footer/Footer";
import Navbar from "../../NavBar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
function VolunteerForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/app/volunteers", {
        ...formData,
        eventId, // 👈 link to event
      });

      alert("Successfully registered as volunteer!");
      navigate("/VolunteerPage");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="containerF">
        <div className="left">
          <p className="tag">RECRUITMENT OPEN</p>
          <h1>
            Shape the <br />
            <span>Metropolis</span>
          </h1>
          <p className="desc">
            Join City's volunteer force. Our urban initiatives require dedicated
            individuals to manage logistical flows and community outreach.
          </p>

          <div className="features">
            <div className="feature">
              <div className="icon">✔</div>
              <div className="Extra">
                <h4>Official Clearance</h4>
                <p>Get certificate for your contribution in the society.</p>
              </div>
            </div>

            <div className="feature">
              <div className="icon">⏱</div>
              <div className="Extra">
                <h4>Flexible Shifts</h4>
                <p>24/7 operations in the Neon sector.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="formCardV">
          <h2>Volunteer Registration</h2>

          <form onSubmit={submitForm}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VolunteerForm;
