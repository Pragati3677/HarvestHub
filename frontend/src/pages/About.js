import React from "react";
import "./About.css";

function About() {
  const features = [
    { icon: "🌱", title: "100% Organic", desc: "Grown naturally without harmful chemicals or pesticides. Pure and safe for your family." },
    { icon: "🚚", title: "Farm to Door", desc: "Direct delivery from our Maharashtra farm to your home. No middlemen, no delays." },
    { icon: "💰", title: "Best Prices", desc: "Because we sell directly, you always get the freshest fruits at the most affordable prices." },
  ];

  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>🌿 About HarvestHub</h1>
        <p>
          We are a family-owned farm in Maharashtra, bringing you the freshest
          organic fruits directly from our fields to your doorstep.
        </p>
      </div>

      <div className="about-cards">
        {features.map((f, i) => (
          <div className="about-card" key={i}>
            <div className="about-card-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="about-story">
        <h2>🌾 Our Story</h2>
        <p>
          HarvestHub started as a small family farm in Sangli, Maharashtra. For
          generations, our family has been growing fruits using traditional
          organic methods passed down through the years.
        </p>
        <p>
          We built this platform to connect directly with customers who value
          fresh, healthy, and naturally grown fruits. By removing middlemen,
          we ensure you get the best quality at the best price.
        </p>
        <p>
          🍎 Every fruit you order comes straight from our farm, picked fresh
          and delivered within 24 hours. We take pride in what we grow!
        </p>
      </div>
    </div>
  );
}

export default About;