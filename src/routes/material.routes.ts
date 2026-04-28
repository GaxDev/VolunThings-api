import { Router } from "express";
import {
  getMaterials,
  getMaterial,
  postMaterial,
  putMaterial,
  deleteMaterialById,
  upload,
} from "../controllers/material.controller";

const router = Router();

router.get("/", getMaterials);
router.get("/:id", getMaterial);
router.post("/", upload.array("images", 6), postMaterial);
router.put("/:id", putMaterial);
router.delete("/:id", deleteMaterialById);

export default router;