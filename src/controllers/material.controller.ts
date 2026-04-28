import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../services/material.service";
import { createImage } from "../services/images_material.service";

const imagesDir = path.join(__dirname, "../../Images");
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, imagesDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Solo se permiten imágenes"));
  },
});

export const getMaterials = async (req: Request, res: Response) => {
  try {
    const result = await getAllMaterials();
    res.status(200).json({ ok: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const getMaterial = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await getMaterialById(id);

    if (result.rowCount === 0) {
      res.status(404).json({ ok: false, message: "El material no se ha encontrado" });
      return;
    }

    res.status(200).json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const postMaterial = async (req: Request, res: Response) => {
  try {
    const { name, category, description, status } = req.body;
    const result = await createMaterial(name, category, description, status ?? "available");
    const materialId = result.rows[0].id;

    const files = req.files as Express.Multer.File[];
    if (files && files.length > 0) {
      for (const file of files) {
        const imageUrl = `/public/materials/${file.filename}`;
        await createImage(materialId, imageUrl);
      }
    }

    res.status(201).json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const putMaterial = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { name, category, description } = req.body;
    const result = await updateMaterial(id, name, category, description);

    if (result.rowCount === 0) {
      res.status(404).json({ ok: false, message: "El material no se ha encontrado" });
      return;
    }

    res.status(200).json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const deleteMaterialById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await deleteMaterial(id);

    if (result.rowCount === 0) {
      res.status(404).json({ ok: false, message: "El material no se ha encontrado" });
      return;
    }

    res.status(200).json({ ok: true, message: "El material se ha eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};