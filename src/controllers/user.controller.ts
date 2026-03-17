import { Request, Response } from "express";
import { allUsers } from '../services/user.service';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await allUsers();
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Error en el servidor" });
  }
};