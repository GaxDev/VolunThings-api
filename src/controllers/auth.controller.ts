import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById } from "../services/auth.service";
import { JwtPayload } from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ ok: false, error: "Email y password son obligatorios" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ ok: false, error: "Email no válido" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ ok: false, error: "El password debe tener al menos 6 caracteres" });
      return;
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ ok: false, error: "El email ya está registrado" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, hashedPassword);

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Error en el servidor" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ ok: false, error: "Email y password son obligatorios" });
      return;
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ ok: false, error: "Credenciales inválidas" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ ok: false, error: "Credenciales inválidas" });
      return;
    }

    const secret = process.env.JWT_SECRET as string;
    const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1d") as string;

    const token = jwt.sign(
      { id: user.id, email: user.email },
      secret,
      { expiresIn } as jwt.SignOptions
    );

    res.status(200).json({
      ok: true,
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Error en el servidor" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as JwtPayload;
    const user = await findUserById(id);

    if (!user) {
      res.status(404).json({ ok: false, message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json({ ok: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};
