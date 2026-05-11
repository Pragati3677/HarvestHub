const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const feedback = new Feedback(req.body);

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback saved",
    });

  } catch (error) {
    console.error("FEEDBACK ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;