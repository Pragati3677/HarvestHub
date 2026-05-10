import React, { useEffect, useState } from "react";
import "./ViewProduct.css";

const ViewProduct = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFruits = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/fruits/all");
      const data = await res.json();
      setFruits(data);
    } catch (err) {
      alert("❌ Cannot connect to server.");
    }
    setLoading(false);
  };

  useEffect(() => { fetchFruits(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fruit?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/fruits/${id}`, { method: "DELETE" });
      const data = await res.json();
      alert("✅ " + data.message);
      fetchFruits();
    } catch (err) {
      alert("❌ Delete failed.");
    }
  };

  if (loading) return <p style={{textAlign:"center", marginTop:"40px"}}>Loading fruits...</p>;

  return (
    <div className="view-product-container">
      <h2>🍎 All Fruits ({fruits.length})</h2>
      {fruits.length === 0 ? (
        <p>No fruits added yet. Go to Add Fruit first!</p>
      ) : (
        <table className="fruit-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fruits.map((fruit, index) => (
              <tr key={fruit._id}>
                <td>{index + 1}</td>
                <td>{fruit.name}</td>
                <td>₹{fruit.price}</td>
                <td>{fruit.description}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(fruit._id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewProduct;