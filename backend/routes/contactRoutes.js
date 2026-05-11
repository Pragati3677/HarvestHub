const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const contact = new Contact(req.body);

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
    });

  } catch (error) {
    console.error("CONTACT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;