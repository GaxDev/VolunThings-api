import { Request, Response } from "express";
import {
  getAllMaterials,
  getTotalMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../services/material.service";

export const getMaterials = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;
    const offset = (page - 1) * size;

    const [result, totalResult] = await Promise.all([
      getAllMaterials(size, offset),
      getTotalMaterials(),
    ]);

    const total = parseInt(totalResult.rows[0].count);

    res.status(200).json({
      ok: true,
      data: result.rows,
      pagination: {
        total,
        page,
        size,
        totalPages: Math.ceil(total / size),
      },
    });
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
    const { name, category, description } = req.body;
    const result = await createMaterial(name, category, description);
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