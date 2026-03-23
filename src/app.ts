import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import materialRoutes from "./routes/material.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/materials", materialRoutes);

export default app;