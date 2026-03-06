import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './FruitList.css';

import appleImg from '../assets/apple.jpeg';
import bananaImg from '../assets/banana.jpeg';
import orangeImg from '../assets/orange.jpeg';
import mangoImg from '../assets/mango.jpeg';
import pineappleImg from '../assets/pineapple.jpeg';
import grapesImg from '../assets/grapes.jpeg';

const fruits = [
  { id: 1, name: "Apple", price: 50, image: appleImg },
  { id: 2, name: "Banana", price: 30, image: bananaImg },
  { id: 3, name: "Orange", price: 40, image: orangeImg },
  { id: 4, name: "Mango", price: 60, image: mangoImg },
  { id: 5, name: "Pineapple", price: 70, image: pineappleImg },
  { id: 6, name: "Grapes", price: 35, image: grapesImg },
];

function FruitList() {
  const [selectedFruits, setSelectedFruits] = useState([]);
  const navigate = useNavigate();

  const toggleSelectFruit = (fruit) => {
    const exists = selectedFruits.find((f) => f.id === fruit.id);
    if (exists) {
      setSelectedFruits(selectedFruits.filter((f) => f.id !== fruit.id));
    } else {
      setSelectedFruits([...selectedFruits, fruit]);
    }
  };

  const getTotalPrice = () => {
    return selectedFruits.reduce((total, fruit) => total + fruit.price, 0);
  };

  const handleBuyNow = () => {
    navigate("/Checkout", { state: { selectedFruits, totalPrice: getTotalPrice() } });
  };

  return (
    <div className="fruit-list-container">
      <h1>Fruits Available</h1>

      <div className="fruit-grid">
        {fruits.map((fruit) => (
          <div
            key={fruit.id}
            className={`fruit-card ${selectedFruits.some(f => f.id === fruit.id) ? 'selected' : ''}`}
            onClick={() => toggleSelectFruit(fruit)}
          >
            <img src={fruit.image} alt={fruit.name} className="fruit-image" />
            <h3>{fruit.name}</h3>
            <p>₹{fruit.price}</p>
            <p className="select-msg">
              {selectedFruits.some(f => f.id === fruit.id) ? "Selected ✅" : "Click to Select"}
            </p>
          </div>
        ))}
      </div>

      {selectedFruits.length > 0 && (
        <div className="selection-box">
          <h2>Selected Fruits:</h2>
          <ul>
            {selectedFruits.map((fruit) => (
              <li key={fruit.id}>{fruit.name} - ₹{fruit.price}</li>
            ))}
          </ul>
          <h3>Total Price: ₹{getTotalPrice()}</h3>
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
}

export default FruitList;
