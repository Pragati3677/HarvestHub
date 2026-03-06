// src/pages/admin/ViewProduct.js
import React from "react";

const ViewProduct = () => {
  // For simplicity, assuming we have an array of products
  const products = [
    { name: "Apple", price: 10, description: "Fresh Apples" },
    { name: "Banana", price: 5, description: "Fresh Bananas" },
  ];

  return (
    <div>
      <h2>View Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewProduct; 