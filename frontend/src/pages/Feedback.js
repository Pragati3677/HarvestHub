import React, { useState } from "react";
import "./Feedback.css";

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (rating === 0) {
    alert("Please select a star rating!");
    return;
  }

  try {
    const response = await fetch("https://harvesthub-backend-xh5u.onrender.com/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        rating,
        message,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSubmitted(true);

      // Clear form
      setName("");
      setEmail("");
      setRating(0);
      setMessage("");
    } else {
      alert(data.message || "Failed to submit feedback");
    }
  } catch (error) {
    console.error("Feedback Error:", error);
    alert("Server error");
  }
};

  if (submitted) {
    return (
      <div className="feedback-page">
        <div className="feedback-success">
          <div className="success-icon">🎉</div>
          <h2>Thank You, {name}!</h2>
          <p>Your feedback has been submitted successfully.</p>
          <p>We really appreciate your time and will use your feedback to improve our service!</p>
          <button onClick={() => { setSubmitted(false); setName(""); setEmail(""); setRating(0); setMessage(""); }}>
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-page">
      <div className="feedback-card">
        <div className="feedback-header">
          <span className="feedback-emoji">💬</span>
          <h1>Share Your Feedback</h1>
          <p>We'd love to hear about your experience with 🌾HarvestHub!</p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-row">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="e.g. Pragati Shendage"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="e.g. you@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Rate Your Experience</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hovered || rating) ? "active" : ""}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                >
                  ★
                </span>
              ))}
              <span className="rating-label">
                {rating === 1 && "Poor 😞"}
                {rating === 2 && "Fair 😐"}
                {rating === 3 && "Good 🙂"}
                {rating === 4 && "Very Good 😊"}
                {rating === 5 && "Excellent 🌟"}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea
              placeholder="Tell us about your experience — what did you like? What can we improve?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Feedback 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;