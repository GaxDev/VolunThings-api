import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import materialRoutes from "./routes/material.routes";
import loanRoutes from "./routes/loan.routes";
import imagesMaterialRoutes from "./routes/images_material.routes";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/public/materials", express.static(path.join(__dirname, "../Images")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/images-materials", imagesMaterialRoutes);

export default app;