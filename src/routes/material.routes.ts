import { Router } from "express";
import {
  getMaterials,
  getMaterial,
  postMaterial,
  putMaterial,
  deleteMaterialById,
  upload,
} from "../controllers/material.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getMaterials);
router.get("/:id", authMiddleware, getMaterial);
router.post("/", authMiddleware, upload.array("images", 6), postMaterial);
router.put("/:id", authMiddleware, putMaterial);
router.delete("/:id", authMiddleware, deleteMaterialById);

export default router;