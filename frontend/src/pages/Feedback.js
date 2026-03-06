import React from "react";
import './Feedback.css'; // Import the CSS file

const Feedback = () => {
  return (
    <form className="feedback-form">
      <h2>Feedback</h2>
      <textarea placeholder="Write your feedback here..." rows="5" cols="30" />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Feedback;
