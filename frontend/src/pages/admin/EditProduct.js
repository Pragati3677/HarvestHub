import React, { useState, useEffect } from "react";
import "./EditProduct.css";

function EditProduct() {
  const [fruits, setFruits] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingFruits, setFetchingFruits] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/fruits/all")
      .then((res) => res.json())
      .then((data) => {
        setFruits(data);
        setFetchingFruits(false);
      })
      .catch(() => {
        alert("❌ Cannot connect to server. Is backend running?");
        setFetchingFruits(false);
      });
  }, []);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    setSuccessMsg("");
    if (!id) {
      setName(""); setPrice(""); setDescription(""); setImageUrl("");
      return;
    }
    const fruit = fruits.find((f) => f._id === id);
    if (fruit) {
      setName(fruit.name || "");
      setPrice(fruit.price || "");
      setDescription(fruit.description || "");
      setImageUrl(fruit.imageUrl || "");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedId) return alert("Please select a fruit!");
    setLoading(true);
    setSuccessMsg("");
    try {
      const res = await fetch(`http://localhost:5000/api/fruits/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: Number(price), imageUrl, description }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("✅ Fruit updated successfully!");
        setFruits((prev) =>
          prev.map((f) =>
            f._id === selectedId
              ? { ...f, name, price: Number(price), imageUrl, description }
              : f
          )
        );
      } else {
        alert("❌ " + (data.error || "Update failed"));
      }
    } catch (err) {
      alert("❌ Update failed. Is backend running?");
    }
    setLoading(false);
  };

  if (fetchingFruits) {
    return (
      <div className="edit-page">
        <div className="edit-loading">
          <div className="edit-spinner"></div>
          <p>Loading fruits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-container">
        <div className="edit-header">
          <span className="edit-icon">✏️</span>
          <h2>Edit Fruit</h2>
          <p>Select a fruit and update its details</p>
        </div>

        <div className="select-group">
          <label>Select Fruit to Edit</label>
          <select value={selectedId} onChange={handleSelect}>
            <option value="">-- Choose a Fruit --</option>
            {fruits.map((fruit) => (
              <option key={fruit._id} value={fruit._id}>
                {fruit.name} — ₹{fruit.price}
              </option>
            ))}
          </select>
        </div>

        {successMsg && <div className="success-banner">{successMsg}</div>}

        {selectedId ? (
          <form onSubmit={handleUpdate} className="edit-form">
            <div className="form-group">
              <label>Fruit Name</label>
              <input type="text" value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mango" required />
            </div>

            <div className="form-group">
              <label>Price (₹ per kg)</label>
              <input type="number" value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 150" required />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input type="text" value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://... (paste image link)" />
              {imageUrl && imageUrl.startsWith("http") && (
                <img className="img-preview" src={imageUrl} alt="preview"
                  onError={(e) => { e.target.style.display = "none"; }} />
              )}
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea value={description} rows={3}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Fresh Alphonso mangoes from farm" required />
            </div>

            <button type="submit" className="update-btn" disabled={loading}>
              {loading ? "Updating..." : "✅ Update Fruit"}
            </button>
          </form>
        ) : (
          <div className="select-hint">
            {fruits.length === 0
              ? "😢 No fruits found. Add fruits first!"
              : "👆 Select a fruit from the dropdown above to edit it"}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProduct;