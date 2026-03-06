const express = require('express');
const router = express.Router();
const Fruit = require('../models/Fruit');

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

router.get('/all', async (req, res) => {
  try {
    const fruits = await Fruit.find();
    res.status(200).json(fruits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch fruits.' });
  }
});

module.exports = router;
