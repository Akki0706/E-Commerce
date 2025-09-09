// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../db/review')

// Get reviews for a specific product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post a new review
router.post('/product/:productId', async (req, res) => {
  const { reviewer, rating, comment } = req.body;
  const review = new Review({
    productId: req.params.productId,
    reviewer,
    rating,
    comment
  });

  try {
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
