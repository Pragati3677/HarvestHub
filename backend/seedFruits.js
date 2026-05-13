const mongoose = require("mongoose");
const Fruit = require("./models/Fruit");
require("dotenv").config();

const fruits = [
  {
    name: "Mango",
    price: 150,
    description: "Fresh Alphonso mangoes directly from our Maharashtra farm. Sweet, juicy and organic.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg",
  },
  {
    name: "Apple",
    price: 200,
    description: "Fresh red apples packed with vitamins. Crunchy and naturally sweet.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
  },
  {
    name: "Banana",
    price: 60,
    description: "Farm fresh bananas rich in potassium and natural energy. Perfect for daily health.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Vanilla-Slushy.jpg",
  },
  {
    name: "Orange",
    price: 80,
    description: "Juicy Nagpur oranges full of Vitamin C. Great for immunity and fresh juice.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/Oranges_and_orange_slices.jpg",
  },
  {
    name: "Grapes",
    price: 120,
    description: "Fresh black grapes from our vineyard. Sweet, seedless and full of antioxidants.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg",
  },
  {
    name: "Pineapple",
    price: 90,
    description: "Tropical pineapples freshly harvested. Perfect for juice, smoothies and desserts.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/09/ThreeTimeAWinner.jpg",
  },
  {
    name: "Watermelon",
    price: 50,
    description: "Big juicy watermelons to beat the summer heat. Refreshing and naturally sweet.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Watermelons.jpg",
  },
  {
    name: "Papaya",
    price: 70,
    description: "Fresh ripe papayas rich in enzymes and vitamins. Great for digestion and health.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Papaya_InIndiaAsCalledPapita.jpg",
  },
  {
    name: "Pomegranate",
    price: 180,
    description: "Fresh pomegranates bursting with antioxidants. Excellent for heart health and immunity.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Pomegranate_fruit_-_whole_and_piece_with_arils.jpg",
  },
  {
    name: "Guava",
    price: 60,
    description: "Fresh organic guavas from our farm. Rich in Vitamin C and dietary fiber.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Guava_ID.jpg",
  },
];

const seedFruits = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Delete existing fruits
    await Fruit.deleteMany({});
    console.log("🗑️ Old fruits cleared");

    // Insert new fruits
    await Fruit.insertMany(fruits);
    console.log("✅ 10 fruits added successfully!");

    fruits.forEach((f) => console.log(`  🍎 ${f.name} — ₹${f.price}`));

    mongoose.connection.close();
    console.log("✅ Done! Restart your backend and check the fruits page.");
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

seedFruits();