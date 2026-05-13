import { pool } from "../config/db";

export const createUser = async (
  name: string,
  last_name: string,
  email: string,
  hashedPassword: string
) => {
  const { rows } = await pool.query(
    "INSERT INTO users ( email, password, name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, name, last_name, email, created_at",
    [email, hashedPassword, name, last_name]
  );
  return rows[0];
};

export const findUserByEmail = async (email: string) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};
