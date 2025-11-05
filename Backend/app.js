
require('dotenv').config(); // Add this as the FIRST line
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const port = 2000;
const cors = require("cors");


// CORS configuration - MUST be before other middleware
const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3000'], // Add your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


const { GoogleGenerativeAI } = require('@google/generative-ai');

const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const reviewsRouter = require('./routes/review');
const { verifyToken, isAdmin } = require('./middleware/auth-middleware');



// 🤖 Gemini Chatbot API
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

   const prompt = `
You are "E-Com Genie" — a professional, helpful, and friendly AI shopping assistant integrated into an e-commerce website.

The website sells every type of product across all categories (electronics, fashion, home, groceries, accessories, etc.) and supports all standard e-commerce features like:
- Browsing and searching for products
- Checking product details, prices, and availability
- Adding items to cart, purchasing, and making payments
- Order tracking, returns, and customer support

💡 Your job:
- Respond ONLY to the user's query below.
- Always reply **briefly, directly, and conversationally** (2–4 sentences max).
- Do NOT repeat the question or talk about "prompts", "instructions", or "your role".
- Do NOT say things like "I will answer" or "Sure, I understand" — just give the final helpful reply.
- If the user just says "hi", "hello", etc., reply with a friendly short greeting like: "Hi there 👋 How can I help you shop today?"

📩 User's message: ${userMessage}
`;

    // Generate response
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to get chatbot response" });
  }
});


app.get("/", (req, res) => {
    res.send("Server running")
});

async function connectDb(){
    await mongoose.connect("mongodb://localhost:27017", {
        dbName: "e-comm-store-db",
    });
    console.log("Mongodb Connected");
}

connectDb().catch((err) => {
    console.error(err);
})

app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/orders", verifyToken, isAdmin, orderRoutes);
app.use("/product", verifyToken, isAdmin, productRoutes);
app.use("/customer", customerRoutes);
app.use("/auth", authRoutes);
app.use('/api/review', reviewsRouter);

app.listen(port, () => {
    console.log("Server is running on port", port)
})