import { Router } from "express";
import {
  getImagesByMaterial,
  getImage,
  postImage,
  putImage,
  deleteImageById,
} from "../controllers/images_material.controller";

const router = Router();

router.get("/material/:materialId", getImagesByMaterial);
router.get("/:id", getImage);
router.post("/", postImage);
router.put("/:id", putImage);
router.delete("/:id", deleteImageById);

export default router;
