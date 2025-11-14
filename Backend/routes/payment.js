// routes/paymentRoutes.js
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');


const router = express.Router();

// Initialize Razorpay instance with your keys
const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET
});

// ------------------- CREATE ORDER -------------------
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    const options = {
      amount, // amount in paise (e.g., ₹500 => 50000)
      currency,
      receipt: receipt || `rcpt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    console.log(order);
    
    res.json({ success: true, order });
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------- VERIFY PAYMENT -------------------
router.post('/verify-payment', (req, res) => {
  try {
    console.log(req);
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto
      .createHmac('sha256', process.env.RZP_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');
console.log(generated_signature);

    if (generated_signature === razorpay_signature) {
      // ✅ Valid payment signature
      // You can save payment details to DB here
      console.log(razorpay);
      
      return res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      // ❌ Invalid signature
      console.log("abcd");
      
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.log(error);
    
    console.error('Payment verification failed:', error);
    res.status(500).json({ success: false, message: 'Verification error' });
  }
});

module.exports = router;
