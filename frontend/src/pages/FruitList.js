import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FruitList.css";

const DEFAULT_IMAGES = {
  mango: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg",
  apple: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
  banana: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Vanilla-Slushy.jpg",
  orange: "https://upload.wikimedia.org/wikipedia/commons/4/43/Oranges_and_orange_slices.jpg",
  grapes: "https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg",
  grape: "https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg",
  pineapple: "https://upload.wikimedia.org/wikipedia/commons/9/09/ThreeTimeAWinner.jpg",
  watermelon: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Watermelons.jpg",
  papaya: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Papaya_InIndiaAsCalledPapita.jpg",
  guava: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Guava_ID.jpg",
  pomegranate: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Pomegranate_fruit_-_whole_and_piece_with_arils.jpg",
  strawberry: "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg",
  dragon: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Dragonfruit_-_Hylocereus_undatus.jpg",
};

function FruitList() {
  const [fruits, setFruits] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(1000);
  const navigate = useNavigate();

  // ── 🔐 PROTECT ROUTE ──
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("🔐 Please login first to view fruits!");
      navigate("/login");
    }
  }, [navigate]);

  // Fetch fruits from MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/api/fruits/all")
      .then((res) => res.json())
      .then((data) => { setFruits(data); setLoading(false); })
      .catch(() => { alert("❌ Cannot connect to server."); setLoading(false); });
  }, []);

  const getImageSrc = (fruit) => {
    if (fruit.imageUrl && fruit.imageUrl.startsWith("http")) return fruit.imageUrl;
    const nameLower = fruit.name.toLowerCase();
    for (const key of Object.keys(DEFAULT_IMAGES)) {
      if (nameLower.includes(key)) return DEFAULT_IMAGES[key];
    }
    return `https://placehold.co/300x200/e8f5e9/2e7d32?text=${encodeURIComponent(fruit.name)}`;
  };

  const addToCart = (fruit) => {
    setCart((prev) => ({
      ...prev,
      [fruit._id]: { ...fruit, qty: (prev[fruit._id]?.qty || 0) + 1 },
    }));
  };

  const removeFromCart = (fruitId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[fruitId].qty <= 1) delete updated[fruitId];
      else updated[fruitId] = { ...updated[fruitId], qty: updated[fruitId].qty - 1 };
      return updated;
    });
  };

  const deleteFromCart = (fruitId) => {
    setCart((prev) => { const u = { ...prev }; delete u[fruitId]; return u; });
  };

  const cartItems = Object.values(cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) { alert("🛒 Cart is empty!"); return; }
    navigate("/checkout", { state: { cartItems, totalPrice } });
  };

  // Filter & Sort
  const filteredFruits = fruits
    .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    .filter((f) => f.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "low-high") return a.price - b.price;
      if (sortBy === "high-low") return b.price - a.price;
      if (sortBy === "name-az") return a.name.localeCompare(b.name);
      if (sortBy === "name-za") return b.name.localeCompare(a.name);
      return 0;
    });

  if (loading) {
    return (
      <div className="fruit-loading">
        <div className="loading-spinner" />
        <p>Loading fresh fruits... 🍎</p>
      </div>
    );
  }

  return (
    <div className="fruit-page">

      {/* TOP BAR */}
      <div className="fruit-topbar">
        <div className="fruit-topbar__left">
          <h1>🍎 Fresh Fruits</h1>
          <p>{filteredFruits.length} varieties available</p>
        </div>
        <div className="topbar-right">
          <span className="welcome-user">
            👋 {localStorage.getItem("userName") || "Customer"}
          </span>
          <button className="cart-btn" onClick={() => setCartOpen(!cartOpen)}>
            🛒 Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="filter-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search fruits..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && (
            <button className="clear-search" onClick={() => setSearch("")}>✕</button>
          )}
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="name-az">Name: A to Z</option>
            <option value="name-za">Name: Z to A</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Max Price: ₹{maxPrice}</label>
          <input type="range" min="50" max="1000" step="50"
            value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="price-slider" />
        </div>

        <button className="reset-btn" onClick={() => {
          setSearch(""); setSortBy("default"); setMaxPrice(1000);
        }}>
          🔄 Reset
        </button>
      </div>

      <div className="fruit-main">

        {/* FRUIT GRID */}
        <div className={`fruit-grid ${cartOpen ? "fruit-grid--shrink" : ""}`}>
          {filteredFruits.length === 0 ? (
            <div className="no-fruits">
              <p>😢</p>
              <p>No fruits found!</p>
              <p>{search ? `No results for "${search}"` : "Try adjusting your filters"}</p>
              <button onClick={() => { setSearch(""); setSortBy("default"); setMaxPrice(1000); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            filteredFruits.map((fruit) => {
              const inCart = cart[fruit._id];
              return (
                <div className="fruit-card" key={fruit._id}>
                  <div className="fruit-card__img-wrap">
                    <img src={getImageSrc(fruit)} alt={fruit.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/300x200/e8f5e9/2e7d32?text=${encodeURIComponent(fruit.name)}`;
                      }} />
                    {inCart && <div className="fruit-card__badge">{inCart.qty} in cart</div>}
                  </div>
                  <div className="fruit-card__body">
                    <h3>{fruit.name}</h3>
                    <p className="fruit-desc">{fruit.description}</p>
                    <div className="fruit-card__footer">
                      <span className="fruit-price">₹{fruit.price}<small>/kg</small></span>
                      {!inCart ? (
                        <button className="add-btn" onClick={() => addToCart(fruit)}>+ Add</button>
                      ) : (
                        <div className="qty-controls">
                          <button onClick={() => removeFromCart(fruit._id)}>−</button>
                          <span>{inCart.qty}</span>
                          <button onClick={() => addToCart(fruit)}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* CART SIDEBAR */}
        {cartOpen && (
          <div className="cart-sidebar">
            <div className="cart-sidebar__header">
              <h2>🛒 Your Cart</h2>
              <button className="close-cart" onClick={() => setCartOpen(false)}>✕</button>
            </div>
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <p>🛒</p>
                <p>Your cart is empty</p>
                <small>Add some fresh fruits!</small>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div className="cart-item" key={item._id}>
                      <div className="cart-item__info">
                        <strong>{item.name}</strong>
                        <span>₹{item.price} × {item.qty} kg</span>
                      </div>
                      <div className="cart-item__right">
                        <span className="cart-item__total">₹{item.price * item.qty}</span>
                        <div className="qty-controls qty-controls--sm">
                          <button onClick={() => removeFromCart(item._id)}>−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => addToCart(item)}>+</button>
                        </div>
                        <button className="remove-btn" onClick={() => deleteFromCart(item._id)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="cart-summary__row">
                    <span>Items ({totalItems})</span><span>₹{totalPrice}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Delivery</span><span className="free">FREE 🚚</span>
                  </div>
                  <div className="cart-summary__row cart-summary__total">
                    <strong>Total</strong><strong>₹{totalPrice}</strong>
                  </div>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FruitList;