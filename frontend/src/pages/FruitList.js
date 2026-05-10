import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FruitList.css";

// Default fruit images map
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
  const navigate = useNavigate();

  // Fetch fruits from MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/api/fruits/all")
      .then((res) => res.json())
      .then((data) => {
        setFruits(data);
        setLoading(false);
      })
      .catch(() => {
        alert("❌ Cannot connect to server.");
        setLoading(false);
      });
  }, []);

  // Smart image resolver
  const getImageSrc = (fruit) => {
    // 1. Use admin-provided URL if valid
    if (fruit.imageUrl && fruit.imageUrl.startsWith("http")) {
      return fruit.imageUrl;
    }
    // 2. Try to match fruit name to default images
    const nameLower = fruit.name.toLowerCase();
    for (const key of Object.keys(DEFAULT_IMAGES)) {
      if (nameLower.includes(key)) {
        return DEFAULT_IMAGES[key];
      }
    }
    // 3. Final fallback — green placeholder with fruit name
    return `https://placehold.co/300x200/e8f5e9/2e7d32?text=${encodeURIComponent(fruit.name)}`;
  };

  // Add to cart
  const addToCart = (fruit) => {
    setCart((prev) => ({
      ...prev,
      [fruit._id]: {
        ...fruit,
        qty: (prev[fruit._id]?.qty || 0) + 1,
      },
    }));
  };

  // Remove one from cart
  const removeFromCart = (fruitId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[fruitId].qty <= 1) {
        delete updated[fruitId];
      } else {
        updated[fruitId] = { ...updated[fruitId], qty: updated[fruitId].qty - 1 };
      }
      return updated;
    });
  };

  // Delete item completely from cart
  const deleteFromCart = (fruitId) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[fruitId];
      return updated;
    });
  };

  const cartItems = Object.values(cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty! Please add some fruits first.");
      return;
    }
    navigate("/checkout", { state: { cartItems, totalPrice } });
  };

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

      {/* ── TOP BAR ── */}
      <div className="fruit-topbar">
        <div className="fruit-topbar__left">
          <h1>🍎 Fresh Fruits</h1>
          <p>{fruits.length} varieties available</p>
        </div>
        <button className="cart-btn" onClick={() => setCartOpen(!cartOpen)}>
          🛒 Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </div>

      <div className="fruit-main">

        {/* ── FRUIT GRID ── */}
        <div className={`fruit-grid ${cartOpen ? "fruit-grid--shrink" : ""}`}>
          {fruits.length === 0 ? (
            <div className="no-fruits">
              <p>😢 No fruits available right now.</p>
              <p>Ask admin to add some fruits!</p>
            </div>
          ) : (
            fruits.map((fruit) => {
              const inCart = cart[fruit._id];
              return (
                <div className="fruit-card" key={fruit._id}>
                  <div className="fruit-card__img-wrap">
                    <img
                      src={getImageSrc(fruit)}
                      alt={fruit.name}
                      onError={(e) => {
                        // If image fails, show placeholder
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/300x200/e8f5e9/2e7d32?text=${encodeURIComponent(fruit.name)}`;
                      }}
                    />
                    {inCart && (
                      <div className="fruit-card__badge">
                        {inCart.qty} in cart
                      </div>
                    )}
                  </div>
                  <div className="fruit-card__body">
                    <h3>{fruit.name}</h3>
                    <p className="fruit-desc">{fruit.description}</p>
                    <div className="fruit-card__footer">
                      <span className="fruit-price">₹{fruit.price}<small>/kg</small></span>
                      {!inCart ? (
                        <button className="add-btn" onClick={() => addToCart(fruit)}>
                          + Add
                        </button>
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

        {/* ── CART SIDEBAR ── */}
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
                    <span>Items ({totalItems})</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Delivery</span>
                    <span className="free">FREE 🚚</span>
                  </div>
                  <div className="cart-summary__row cart-summary__total">
                    <strong>Total</strong>
                    <strong>₹{totalPrice}</strong>
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