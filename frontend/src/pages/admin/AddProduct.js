import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://harvesthub-backend-xh5u.onrender.com/api/fruits/add-fruit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: Number(price), imageUrl, description }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("✅ " + data.message);
        setName(""); setPrice(""); setDescription(""); setImageUrl("");
      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      alert("❌ Cannot connect to server. Is backend running?");
    }
    setLoading(false);
  };

  return (
    <div className="add-product-container">
      <h2>➕ Add New Fruit</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <label>Fruit Name</label>
          <input type="text" placeholder="e.g. Mango" value={name}
            onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price (₹)</label>
          <input type="number" placeholder="e.g. 60" value={price}
            onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" placeholder="https://... (paste image link)" value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <textarea placeholder="e.g. Fresh alphonso mangoes from farm"
            value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Fruit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;