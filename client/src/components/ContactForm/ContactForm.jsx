import React from "react";
import "./ContactForm.css";

const ContactForm = () => {

  return (

    <div className="section">

      <h3>Contact Information (Optional)</h3>

      <div className="contact-grid">

        <div>
          <label>Full Name</label>
          <input placeholder="John Doe" />
        </div>

        <div>
          <label>Email</label>
          <input type="email" placeholder="john@email.com" />
        </div>

        <div>
          <label>Phone</label>
          <input type="tel" placeholder="+880..." />
        </div>

      </div>

      <div className="notice">

        <span className="material-symbols-outlined">
          notifications
        </span>

        <p>
          You will receive updates about your complaint.
        </p>

      </div>

    </div>

  );
};

export default ContactForm;