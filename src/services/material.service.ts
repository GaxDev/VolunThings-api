import { pool } from "../config/db";

export const getAllMaterials = async () => {
  return await pool.query(`
    SELECT
      m.*,
      COALESCE(
        JSON_AGG(im.image_url ORDER BY im.id) FILTER (WHERE im.image_url IS NOT NULL),
        '[]'
      ) AS images
    FROM materials m
    LEFT JOIN images_materials im ON im.material_id = m.id
    GROUP BY m.id
    ORDER BY m.id ASC
  `);
};

export const getMaterialById = async (id: number) => {
  return await pool.query("SELECT * FROM materials WHERE id = $1", [id]);
};

export const createMaterial = async (
  name: string,
  category: string,
  description: string,
  status: string = "available"
) => {
  return await pool.query(
    "INSERT INTO materials (name, category, description, status) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, category, description, status]
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