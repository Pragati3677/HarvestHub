import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css'; // your CSS

function Payment() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handlePayment = () => {
    if (selectedOption) {
      navigate('/payment-success');  // 👉 go to success page instead of alert
    } else {
      alert('Please select a payment option!');
    }
  };

  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="payment"
            value="Credit Card"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          Credit Card
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          UPI
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          Cash on Delivery
        </label>
      </div>

      <button onClick={handlePayment}>Proceed to Pay</button>
    </div>
  );
}

export default Payment;
