import { useState } from "react";
import "./Events.css";

const mockEvents = [
  {
    _id: "1",
    title: "City Cleanliness Drive",
    description: "Community-wide cleanliness campaign across major roads and parks.",
    date: "2024-05-10",
    time: "08:00",
    location: "Kishorganj Sadar",
    volunteers: [
      { _id: "v1", name: "Arif Hassan", email: "arif@email.com", phone: "01711111111", status: "active" },
      { _id: "v2", name: "Mitu Akter", email: "mitu@email.com", phone: "01722222222", status: "inactive" },
    ],
  },
  {
    _id: "2",
    title: "Blood Donation Camp",
    description: "Emergency blood donation drive at the district hospital.",
    date: "2024-05-18",
    time: "10:00",
    location: "Kishorganj District Hospital",
    volunteers: [
      { _id: "v3", name: "Rakib Islam", email: "rakib@email.com", phone: "01733333333", status: "active" },
    ],
  },
  {
    _id: "3",
    title: "Tree Plantation Program",
    description: "Planting 500 saplings along the riverbank to combat deforestation.",
    date: "2024-06-05",
    time: "07:30",
    location: "Narshunda River Bank",
    volunteers: [],
  },
];

const emptyForm = { title: "", description: "", date: "", time: "", location: "" };

export default function Events() {
  const [events, setEvents] = useState(mockEvents);
  const [showForm, setShowForm] = useState(false);
  const [eventForm, setEventForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [contactModal, setContactModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleAddEvent = () => {
    if (!eventForm.title || !eventForm.date || !eventForm.time || !eventForm.location) {
      setFormError("Please fill in all required fields.");
      return;
    }
    const newEvent = { ...eventForm, _id: Date.now().toString(), volunteers: [] };
    setEvents([newEvent, ...events]);
    setEventForm(emptyForm);
    setShowForm(false);
    setFormError("");
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(e => e._id !== id));
    setDeleteConfirm(null);
    if (expandedEvent === id) setExpandedEvent(null);
  };

  const handleRemoveVolunteer = (eventId, volId) =>
    setEvents(events.map(e =>
      e._id === eventId
        ? { ...e, volunteers: e.volunteers.filter(v => v._id !== volId) }
        : e
    ));

  const updateVolunteerStatus = (eventId, volId, status) =>
    setEvents(events.map(e =>
      e._id === eventId
        ? { ...e, volunteers: e.volunteers.map(v => v._id === volId ? { ...v, status } : v) }
        : e
    ));

  return (
    <div className="events-wrapper">

      {/* Contact modal */}
      {contactModal && (
        <div className="events-overlay" onClick={() => setContactModal(null)}>
          <div className="events-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Volunteer details</div>
            {[["Name", contactModal.name], ["Email", contactModal.email], ["Phone", contactModal.phone]].map(([l, v]) => (
              <div key={l} className="modal-field">
                <span className="modal-field-label">{l}</span>
                <span className="modal-field-value">{v}</span>
              </div>
            ))}
            <div className="modal-field">
              <span className="modal-field-label">Status</span>
              <span
                className="events-badge"
                style={contactModal.status === "active"
                  ? { background: "#D1FAE5", color: "#065F46" }
                  : { background: "#FEF3C7", color: "#92400E" }}
              >
                {contactModal.status}
              </span>
            </div>
            <button className="modal-close-btn" onClick={() => setContactModal(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="events-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="events-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Delete event?</div>
            <p className="modal-desc">This will permanently remove the event and all its volunteer enrollments.</p>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="modal-delete-btn" onClick={() => handleDeleteEvent(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="events-header">
        <div>
          <h1 className="events-title">Events</h1>
          <p className="events-sub">Create events and manage volunteer enrollments</p>
        </div>
        <button
          className={`events-add-btn ${showForm ? "cancel" : ""}`}
          onClick={() => { setShowForm(!showForm); setFormError(""); setEventForm(emptyForm); }}
        >
          {showForm ? "Cancel" : "+ Add event"}
        </button>
      </div>

      {/* Add event form */}
      {showForm && (
        <div className="events-form-card">
          <div className="events-form-heading">New event</div>
          <div className="events-form-grid">
            <div className="form-field">
              <label className="form-label">Title *</label>
              <input
                className="form-input"
                placeholder="e.g. City Cleanliness Drive"
                value={eventForm.title}
                onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Location *</label>
              <input
                className="form-input"
                placeholder="e.g. Kishorganj Sadar"
                value={eventForm.location}
                onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Date *</label>
              <input
                className="form-input"
                type="date"
                value={eventForm.date}
                onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Time *</label>
              <input
                className="form-input"
                type="time"
                value={eventForm.time}
                onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Describe the event..."
              value={eventForm.description}
              onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
            />
          </div>
          {formError && <p className="form-error">{formError}</p>}
          <button className="form-submit-btn" onClick={handleAddEvent}>Create event</button>
        </div>
      )}

      {/* Event list */}
      <div className="events-list">
        {events.length === 0 && (
          <div className="events-empty">No events yet. Create your first event above.</div>
        )}

        {events.map(ev => (
          <div key={ev._id} className="event-card">

            {/* Event header */}
            <div className="event-card-header">
              <div className="event-card-info">
                <div className="event-card-top">
                  <span className="event-card-title">{ev.title}</span>
                  <span className="event-vol-badge">
                    {ev.volunteers.length} volunteer{ev.volunteers.length !== 1 ? "s" : ""}
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
                  onClick={() => setExpandedEvent(expandedEvent === ev._id ? null : ev._id)}
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
                  Enrolled volunteers {ev.volunteers.length > 0 && `(${ev.volunteers.length})`}
                </div>

                {ev.volunteers.length === 0 ? (
                  <p className="event-vol-empty">No volunteers enrolled yet. They will appear here when they sign up from the public site.</p>
                ) : (
                  <div className="event-vol-table-wrapper">
                    <table className="event-vol-table">
                      <thead>
                        <tr className="event-vol-thead-row">
                          {["Name", "Status", "Actions"].map(h => (
                            <th key={h} className="event-vol-th">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ev.volunteers.map(v => (
                          <tr key={v._id} className="event-vol-row">
                            <td className="event-vol-td vol-name">{v.name}</td>
                            <td className="event-vol-td">
                              <select
                                value={v.status}
                                onChange={e => updateVolunteerStatus(ev._id, v._id, e.target.value)}
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
                                  onClick={() => handleRemoveVolunteer(ev._id, v._id)}
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