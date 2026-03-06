// PaymentSuccess.jsx
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Show SweetAlert popup immediately when page loads
    Swal.fire({
      title: 'Payment Successful!',
      text: 'Thank you for your purchase 🎉',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Go to Home',
      allowOutsideClick: false, // User can't click outside to close
      allowEscapeKey: false,    // User can't press ESC to close
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/'); // Go to Home when button clicked
      }
    });
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Please wait... Preparing your order! 🍎🍌🍇</h2>
    </div>
  );
}

export default PaymentSuccess;
