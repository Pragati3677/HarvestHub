import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dragonFruitImg from "../assets/Dragon Fruit.jpeg";
import mangoImg from "../assets/mango.jpeg";
import appleImg from "../assets/apple.jpeg";
import "./Home.css";

const features = [
  { icon: "🌱", title: "100% Organic", desc: "Grown naturally without chemicals or pesticides" },
  { icon: "🚚", title: "Farm to Door", desc: "Fresh delivery straight from our Maharashtra farm" },
  { icon: "💰", title: "Best Prices", desc: "No middlemen — you pay farm-direct prices" },
  { icon: "⚡", title: "Same Day Delivery", desc: "Order by noon, receive by evening" },
];

const testimonials = [
  { name: "Rahul M.", text: "Best mangoes I've ever had! So fresh and sweet.", stars: 5 },
  { name: "Priya S.", text: "Fast delivery and fruits were perfectly packed.", stars: 5 },
  { name: "Amit K.", text: "Love supporting local farmers. Will order again!", stars: 5 },
];

function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className={`hero ${visible ? "hero--visible" : ""}`}>
        <div className="hero__bg-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>

        <div className="hero__content">
          <div className="hero__badge">🌿 Fresh from Maharashtra Farm</div>
          <h1 className="hero__title">
            Farm-Fresh Fruits<br />
            <span className="hero__title--accent">Delivered to Your Door</span>
          </h1>
          <p className="hero__subtitle">
            Skip the market. Order premium organic fruits directly from our
            farm and get them delivered fresh to your home — same day!
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => navigate("/fruits")}>
              🛒 Shop Fruits Now
            </button>
            <button className="btn btn--secondary" onClick={() => navigate("/about")}>
              Learn About Us
            </button>
          </div>
          <div className="hero__stats">
            <div className="stat"><strong>500+</strong><span>Happy Customers</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>20+</strong><span>Fruit Varieties</span></div>
            <div className="stat-divider" />
            <div className="stat"><strong>100%</strong><span>Organic</span></div>
          </div>
        </div>

        <div className="hero__images">
          <div className="fruit-float fruit-float--main">
            <img src={dragonFruitImg} alt="Dragon Fruit" />
          </div>
          <div className="fruit-float fruit-float--top">
            <img src={mangoImg} alt="Mango" />
          </div>
          <div className="fruit-float fruit-float--bottom">
            <img src={appleImg} alt="Apple" />
          </div>
        </div>
      </section>

      {/* ── MARQUEE BANNER ── */}
      <div className="marquee-banner">
        <div className="marquee-track">
          {["🍎 Fresh Apples", "🥭 Alphonso Mangoes", "🍇 Black Grapes", "🍊 Nagpur Oranges",
            "🍍 Golden Pineapple", "🐉 Dragon Fruit", "🍌 Bananas", "🍎 Fresh Apples",
            "🥭 Alphonso Mangoes", "🍇 Black Grapes", "🍊 Nagpur Oranges", "🍍 Golden Pineapple"].map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose HarvestHub?</h2>
          <p>We're not just a store — we're your farm family</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Taste the Difference? 🥭</h2>
          <p>Join hundreds of happy customers who get farm-fresh fruits every week</p>
          <button className="btn btn--white" onClick={() => navigate("/register")}>
            Get Started — It's Free!
          </button>
        </div>
        <div className="cta-emoji-grid">
          {["🍎","🥭","🍊","🍇","🍍","🍌","🐉","🍓"].map((e, i) => (
            <span key={i} className="cta-emoji" style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Customers Say 💬</h2>
          <p>Real reviews from real fruit lovers</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="stars">{"★".repeat(t.stars)}</div>
              <p>"{t.text}"</p>
              <strong>— {t.name}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">🌾HarvestHub</span>
            <p>Fresh fruits directly from our Maharashtra farm to your home.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="/fruits">Shop Fruits</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/feedback">Feedback</a>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <span>📧 support@fruitfarm.com</span>
            <span>📞 +91 97633 63390</span>
            <span>📍 Malashiras-413103, Solapur, Maharashtra</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 🌾HarvestHub. Made with Pragati ❤️</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;