import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, second_name, email, password } = req.body;

    if (!name || !second_name || !email || !password) {
      res.status(400).json({ ok: false, error: "Todos los campos son obligatorios" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ ok: false, error: "Email no válido" });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ ok: false, error: "El password debe tener al menos 8 caracteres" });
      return;
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ ok: false, error: "El email ya está registrado" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, second_name, email, hashedPassword);

    res.status(201).json({ ok: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Error en el servidor" });
  }
};
