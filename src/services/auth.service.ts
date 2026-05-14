import { pool } from "../config/db";

export const createUser = async (email: string, hashedPassword: string) => {
  const { rows } = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
    [email, hashedPassword]
  );
  return rows[0];
};

export const findUserByEmail = async (email: string) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

export const findUserById = async (id: number) => {
  const { rows } = await pool.query(
    "SELECT id, email, created_at FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
};
