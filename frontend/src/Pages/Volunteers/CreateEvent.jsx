import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";
import axiosInstance from "../../utils/AxiosInstance";
function CreateEvent() {
  const [event, setEvent] = useState({
    type: "",
    description: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const submitEvent = async (e) => {
    e.preventDefault();

    await axiosInstance.post("/api/events", event);
    navigate("/VolunteerPage");
  };

  return (
    <div className="event-form">
      <div className="create-form-container">
        <h2>Create Event</h2>

        <form onSubmit={submitEvent}>
          <select name="type" onChange={handleChange} required>
            <option value="">Select Event Type</option>
            <option value="Environmental">Cleaning Drive</option>
            <option value="Senior">Helping old</option>
            <option value="Community">Comunity Events</option>
            <option value="Educatinal">Educatinal Program</option>
          </select>
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
