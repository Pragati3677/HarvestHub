import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSent(true);

      // Clear form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      alert(data.message || "Failed to send message");
    }

  } catch (error) {
    console.error("Contact Error:", error);
    alert("Server Error");
  }
};

  if (sent) {
    return (
      <div className="contact-page">
        <div className="contact-success">
          <div className="success-icon">✅</div>
          <h2>Message Sent!</h2>
          <p>Thank you, <strong>{name}</strong>! We'll get back to you at <strong>{email}</strong> within 24 hours.</p>
          <button onClick={() => { setSent(false); setName(""); setEmail(""); setSubject(""); setMessage(""); }}>
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="contact-wrapper">

        {/* Left — Info Panel */}
        <div className="contact-info-panel">
          <h1>🌿 Get In Touch</h1>
          <p>Have questions about our fruits or delivery? We're here to help!</p>

          <div className="info-item">
            <span className="info-icon">📧</span>
            <div>
              <strong>Email Us</strong>
              <p>support@fruitfarm.com</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <strong>Call Us</strong>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <strong>Our Farm</strong>
              <p>Sangli, Maharashtra, India</p>
            </div>
          </div>

          <div className="info-item">
            <span className="info-icon">🕐</span>
            <div>
              <strong>Working Hours</strong>
              <p>Mon – Sat: 8:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>

        {/* Right — Contact Form */}
        <div className="contact-form-panel">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                placeholder="e.g. Delivery query, Bulk order..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
              />
            </div>

            <button type="submit" className="send-btn">
              Send Message 📨
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;