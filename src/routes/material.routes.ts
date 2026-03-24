import { Router } from "express";
import {
  getMaterials,
  getMaterial,
  postMaterial,
  putMaterial,
  deleteMaterialById,
} from "../controllers/material.controller";

const router = Router();

router.get("/", getMaterials);
router.get("/:id", getMaterial);
router.post("/", postMaterial);
router.put("/:id", putMaterial);
router.delete("/:id", deleteMaterialById);

export default router;