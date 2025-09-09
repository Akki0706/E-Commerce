// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 2000;
// const cors = require("cors");                    
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// const categoryRoutes = require("./routes/category");
// const brandRoutes = require("./routes/brand");
// const orderRoutes = require("./routes/order");
// const productRoutes = require("./routes/product");
// const customerRoutes = require("./routes/customer");
// const authRoutes = require("./routes/auth");
// const reviewsRouter = require('./routes/review');
// const { verifyToken,isAdmin } = require('./middleware/auth-middleware');
// app.use(cors());

// app.get("/", (req, res) => {
//     res.send("Server running")
// });

// async function connectDb(){
//     await mongoose.connect("mongodb://localhost:27017",{
//         dbName:"e-comm-store-db",
//     });
//     console.log("Mongodb Connected");
// }
// connectDb().catch((err)=>{
//     console.error(err);
// })

// app.use("/category",verifyToken,isAdmin,categoryRoutes);
// app.use("/brand",verifyToken,isAdmin,brandRoutes);
// app.use("/orders",verifyToken,isAdmin,orderRoutes);
// app.use("/product",verifyToken,isAdmin,productRoutes);
// app.use("/customer",customerRoutes);
// app.use("/auth",authRoutes);
// app.use('/api/review', reviewsRouter);



// app.listen(port, () => {
//     console.log("Server is running on port", port)
// })

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



const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const reviewsRouter = require('./routes/review');
const { verifyToken, isAdmin } = require('./middleware/auth-middleware');

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