import { Request, Response } from "express";
import {
  getAllImagesByMaterialId,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
} from "../services/images_material.service";

export const getImagesByMaterial = async (req: Request, res: Response) => {
  try {
    const materialId = parseInt(req.params.materialId as string);
    const result = await getAllImagesByMaterialId(materialId);
    res.status(200).json({ ok: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const getImage = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await getImageById(id);

    if (result.rowCount === 0) {
      res.status(404).json({ ok: false, message: "La imagen no se ha encontrado" });
      return;
    }

    res.status(200).json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const postImage = async (req: Request, res: Response) => {
  try {
    const { material_id, image_url } = req.body;
    const result = await createImage(material_id, image_url);
    res.status(201).json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const putImage = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { image_url } = req.body;
    const result = await updateImage(id, image_url);

    if (result.rowCount === 0) {
      res.status(404).json({ ok: false, message: "La imagen no se ha encontrado" });
      return;
    }

    res.status(200).json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const deleteImageById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await deleteImage(id);

    if (result.rowCount === 0) {
      res.status(404).json({ ok: false, message: "La imagen no se ha encontrado" });
      return;
    }

    res.status(200).json({ ok: true, message: "La imagen se ha eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};
