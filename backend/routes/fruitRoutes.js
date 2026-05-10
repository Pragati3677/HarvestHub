const express = require('express');
const router = express.Router();
const Fruit = require('../models/Fruit');

// ➕ Add Fruit
router.post('/add-fruit', async (req, res) => {
  const { name, price, imageUrl, description } = req.body;
  try {
    const newFruit = new Fruit({ name, price, imageUrl, description });
    await newFruit.save();
    res.status(201).json({ message: 'Fruit added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add fruit.' });
  }
});

// 📋 Get All Fruits
router.get('/all', async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.status(200).json(fruits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch fruits.' });
  }
});

// 🔍 Get Single Fruit by ID
router.get('/:id', async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    if (!fruit) return res.status(404).json({ error: 'Fruit not found' });
    res.status(200).json(fruit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch fruit.' });
  }
});

// ✏️ Update Fruit
router.put('/:id', async (req, res) => {
  try {
    const updated = await Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Fruit updated successfully!', fruit: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update fruit.' });
  }
});

// 🗑️ Delete Fruit
router.delete('/:id', async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Fruit deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete fruit.' });
  }
});

module.exports = router;