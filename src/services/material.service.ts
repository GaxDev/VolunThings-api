import { pool } from "../config/db";

export const getAllMaterials = async () => {
  return await pool.query("SELECT * FROM materials ORDER BY id ASC");
};

export const getMaterialById = async (id: number) => {
  return await pool.query("SELECT * FROM materials WHERE id = $1", [id]);
};

export const createMaterial = async (
  name: string,
  category: string,
  description: string
) => {
  return await pool.query(
    "INSERT INTO materials (name, category, description) VALUES ($1, $2, $3) RETURNING *",
    [name, category, description]
  );
};

export const updateMaterial = async (
  id: number,
  name: string,
  category: string,
  description: string
) => {
  return await pool.query(
    "UPDATE materials SET name = $1, category = $2, description = $3 WHERE id = $4 RETURNING *",
    [name, category, description, id]
  );
};

export const deleteMaterial = async (id: number) => {
  return await pool.query("DELETE FROM materials WHERE id = $1", [id]);
};