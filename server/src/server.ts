import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import testRoute from "./routes/testRoute";
import documentRoutes from "./routes/documentRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoute);
app.use("/api/docs", documentRoutes);

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Health Check Route
app.get("/", (req, res) => {
  res.send("Server Running");
});

// Start Server
app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});