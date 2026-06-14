import { useEffect, useState } from "react";
import axios from "axios";
import "./Events.css";

const emptyForm = {
  type: "",
  description: "",
  date: "",
  time: "",
  location: "",
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [eventForm, setEventForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [volunteers, setVolunteers] = useState({});
  const [contactModal, setContactModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // FETCH EVENTS
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://citymanagement-backend.onrender.com/api/events",
        { withCredentials: true }
      );
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH VOLUNTEERS FOR AN EVENT
  const fetchVolunteers = async (eventId) => {
    try {
      const res = await axios.get(
        `https://citymanagement-backend.onrender.com/app/volunteers/${eventId}`,
        { withCredentials: true }
      );
      setVolunteers((prev) => ({ ...prev, [eventId]: res.data }));
    } catch (err) {
      console.log(err);
    }
  };

  // TOGGLE VOLUNTEERS PANEL
  const handleExpandEvent = (eventId) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
      fetchVolunteers(eventId);
    }
  };

  // CREATE EVENT
  const handleAddEvent = async () => {
    if (
      !eventForm.type ||
      !eventForm.date ||
      !eventForm.time ||
      !eventForm.location ||
      !eventForm.description
    ) {
      setFormError("Please fill all required fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/events",
        eventForm,
        { withCredentials: true }
      );
      setEvents([res.data, ...events]);
      setEventForm(emptyForm);
      setShowForm(false);
      setFormError("");
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE EVENT
  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/events/${id}`,
        { withCredentials: true }
      );
      setEvents(events.filter((e) => e._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE VOLUNTEER STATUS
  const updateVolunteerStatus = async (eventId, volunteerId, status) => {
    try {
      await axios.patch(
        `http://localhost:8000/app/volunteers/${volunteerId}/status`,
        { status },
        { withCredentials: true }
      );
      setVolunteers((prev) => ({
        ...prev,
        [eventId]: prev[eventId].map((v) =>
          v._id === volunteerId ? { ...v, status } : v
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // REMOVE VOLUNTEER
  const handleRemoveVolunteer = async (eventId, volunteerId) => {
    try {
      await axios.delete(
        `http://localhost:8000/app/volunteers/${volunteerId}`,
        { withCredentials: true }
      );
      setVolunteers((prev) => ({
        ...prev,
        [eventId]: prev[eventId].filter((v) => v._id !== volunteerId),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="events-wrapper">
      {/* Contact modal */}
      {contactModal && (
        <div className="events-overlay" onClick={() => setContactModal(null)}>
          <div className="events-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Volunteer details</div>
            {[
              ["Name", contactModal.userId?.name],
              ["Email", contactModal.userId?.email],
              ["Phone", contactModal.phone],
              ["Age", contactModal.age],
            ].map(([l, v]) => (
              <div key={l} className="modal-field">
                <span className="modal-field-label">{l}</span>
                <span className="modal-field-value">{v}</span>
              </div>
            ))}
            <div className="modal-field">
              <span className="modal-field-label">Status</span>
              <span
                className="events-badge"
                style={
                  contactModal.status === "active"
                    ? { background: "#D1FAE5", color: "#065F46" }
                    : { background: "#FEF3C7", color: "#92400E" }
                }
              >
                {contactModal.status}
              </span>
            </div>
            <button
              className="modal-close-btn"
              onClick={() => setContactModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="events-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="events-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Delete event?</div>
            <p className="modal-desc">
              This will permanently remove the event and all its volunteer
              enrollments.
            </p>
            <div className="modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="modal-delete-btn"
                onClick={() => handleDeleteEvent(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="events-header">
        <div>
          <h1 className="events-title">Events</h1>
          <p className="events-sub">
            Create events and manage volunteer enrollments
          </p>
        </div>
        <button
          className={`events-add-btn ${showForm ? "cancel" : ""}`}
          onClick={() => {
            setShowForm(!showForm);
            setFormError("");
            setEventForm(emptyForm);
          }}
        >
          {showForm ? "Cancel" : "+ Add event"}
        </button>
      </div>

      {/* Add event form */}
      {showForm && (
        <div className="eventsFormCardForm">
          <select
            className="form-select"
            value={eventForm.type}
            onChange={(e) =>
              setEventForm({ ...eventForm, type: e.target.value })
            }
          >
            <option value="">Select Event Type</option>
            <option value="Environmental">Cleaning Drive</option>
            <option value="Senior">Helping Old</option>
            <option value="Community">Community Events</option>
            <option value="Educational">Educational Program</option>
          </select>

          <input
            className="eventsInputForm"
            placeholder="Location"
            value={eventForm.location}
            onChange={(e) =>
              setEventForm({ ...eventForm, location: e.target.value })
            }
          />

          <input
            className="eventsInputForm"
            type="date"
            value={eventForm.date}
            onChange={(e) =>
              setEventForm({ ...eventForm, date: e.target.value })
            }
          />

          <input
            className="eventsInputForm"
            type="time"
            value={eventForm.time}
            onChange={(e) =>
              setEventForm({ ...eventForm, time: e.target.value })
            }
          />

          <textarea
            className="eventsTextareaForm"
            placeholder="Description"
            value={eventForm.description}
            onChange={(e) =>
              setEventForm({ ...eventForm, description: e.target.value })
            }
          />

          {formError && <p className="eventsErrorForm">{formError}</p>}

          <button className="eventsButtonForm" onClick={handleAddEvent}>
            Create Event
          </button>
        </div>
      )}

      {/* Event list */}
      <div className="events-list">
        {events.length === 0 && (
          <div className="events-empty">
            No events yet. Create your first event above.
          </div>
        )}

        {events.map((ev) => (
          <div key={ev._id} className="event-card">
            <div className="event-card-header">
              <div className="event-card-info">
                <div className="event-card-top">
                  <span className="event-card-title">{ev.type}</span>
                  <span className="event-vol-badge">
                    {volunteers[ev._id]?.length ?? 0} volunteer
                    {volunteers[ev._id]?.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {ev.description && (
                  <p className="event-card-desc">{ev.description}</p>
                )}
                <div className="event-card-meta">
                  <span>Date: {ev.date}</span>
                  <span>Time: {ev.time}</span>
                  <span>Location: {ev.location}</span>
                </div>
              </div>
              <div className="event-card-actions">
                <button
                  className={`event-vol-btn ${expandedEvent === ev._id ? "active" : ""}`}
                  onClick={() => handleExpandEvent(ev._id)}
                >
                  {expandedEvent === ev._id ? "Hide" : "Volunteers"}
                </button>
                <button
                  className="event-delete-btn"
                  onClick={() => setDeleteConfirm(ev._id)}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Volunteers panel */}
            {expandedEvent === ev._id && (
              <div className="event-vol-panel">
                <div className="event-vol-heading">
                  Enrolled volunteers{" "}
                  {volunteers[ev._id]?.length > 0 &&
                    `(${volunteers[ev._id].length})`}
                </div>

                {!volunteers[ev._id] || volunteers[ev._id].length === 0 ? (
                  <p className="event-vol-empty">
                    No volunteers enrolled yet.
                  </p>
                ) : (
                  <div className="event-vol-table-wrapper">
                    <table className="event-vol-table">
                      <thead>
                        <tr className="event-vol-thead-row">
                          {["Name", "Phone", "Age", "Status", "Actions"].map((h) => (
                            <th key={h} className="event-vol-th">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {volunteers[ev._id].map((v) => (
                          <tr key={v._id} className="event-vol-row">
                            <td className="event-vol-td vol-name">
                              {v.userId?.name}
                            </td>
                            <td className="event-vol-td">{v.phone}</td>
                            <td className="event-vol-td">{v.age}</td>
                            <td className="event-vol-td">
                              <select
                                value={v.status}
                                onChange={(e) =>
                                  updateVolunteerStatus(
                                    ev._id,
                                    v._id,
                                    e.target.value
                                  )
                                }
                                className="vol-status-select"
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </td>
                            <td className="event-vol-td">
                              <div className="vol-action-btns">
                                <button
                                  className="vol-contact-btn"
                                  onClick={() => setContactModal(v)}
                                >
                                  Contact
                                </button>
                                <button
                                  className="vol-remove-btn"
                                  onClick={() =>
                                    handleRemoveVolunteer(ev._id, v._id)
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
