const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  quantity: Number,
  description: String,
});

module.exports = mongoose.model('Fruit', fruitSchema);
