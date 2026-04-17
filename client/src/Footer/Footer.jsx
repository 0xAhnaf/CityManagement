import React from "react";
import "./Footer.css";

function Footer(){
  return(
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col brand">
          <div className="logo">
            <div className="logo-icon">🏛️</div>
            <span>CityConnect</span>
          </div>
          <p>Dedicated to improving civic life through modern technology and community participation.</p>
          <div className="socials">
            <button aria-label="Facebook">f</button>
            <button aria-label="Camera">📷</button>
            <button aria-label="Share">↗</button>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>Emergency Contacts</li>
            <li>Trash & Recycling</li>
            <li>City Council</li>
            <li>Public Records</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="contact">
            <li>📞 3-1-1 (Local Only)</li>
            <li>✉️ help@cityconnect.gov</li>
            <li>📍 100 Civic Center Plaza</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 CityConnect Municipal Portal. All rights reserved.</span>
        <div className="legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;