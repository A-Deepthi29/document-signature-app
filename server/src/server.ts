import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import testRoute from "./routes/testRoute";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoute);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});