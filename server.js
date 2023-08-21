import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Configure env
dotenv.config();

// Database config
connectDB();

// Create Express app
const app = express();

// Port
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Serve static files from client/dist
const staticPath = path.join(__dirname, "client", "dist");
app.use(express.static(staticPath));

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Catch-all route for serving the index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
