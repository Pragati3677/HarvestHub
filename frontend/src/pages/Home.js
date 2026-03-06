import React from "react";
import dragonFruitImg from "../assets/Dragon Fruit.jpeg";
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <img src={dragonFruitImg} alt="Dragon Fruit" className="home-image" />
      <h1 className="home-heading">Welcome to the Fruit Ordering System</h1>
      <p className="home-subheading">
        Get farm-fresh fruits delivered right to your doorstep! 🍇🍎🍌<br />
        Choose from a wide range of organic and seasonal fruits directly from farmers.
      </p>
      <a href="/login" className="home-btn">Login to Get Started</a>
    </div>
  );
}

export default Home;
