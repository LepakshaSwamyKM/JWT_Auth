const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("./database/db");
const productRoutes = require("./routes/Product_router");

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://jwt-auth-ui.vercel.app/", // Replace with your frontend URL
  credentials: true,
}));app.use(express.json());

app.get("/", (req, res) => {
  console.log("✅ Root route hit");
  res.send("Hello World");
});

const userRoutes = require("./routes/Auth_Router");
app.use("/auth", userRoutes);


app.use("/products", productRoutes);
const PORT = process.env.PORT || 4050;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

connect();
