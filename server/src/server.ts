import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import signatureRoutes from "./routes/signatureRoutes";
import authRoutes from "./routes/authRoutes";
import testRoute from "./routes/testRoute";
import documentRoutes from "./routes/documentRoutes";
import pdfRoutes from "./routes/pdfRoutes";
import publicRoutes from "./routes/publicRoutes";
import auditRoutes from "./routes/auditRoutes";


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoute);
app.use("/api/docs", documentRoutes);
app.use(
  "/api/signatures",
  signatureRoutes
);
app.use(
  "/api/pdf",
  pdfRoutes
);

app.use(
  "/api/public",
  publicRoutes
);

app.use(
  "/api/audit",
  auditRoutes
);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});