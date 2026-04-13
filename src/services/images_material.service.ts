import { pool } from "../config/db";

export const getAllImagesByMaterialId = async (materialId: number) => {
  return await pool.query(
    "SELECT * FROM images_materials WHERE material_id = $1 ORDER BY id ASC",
    [materialId]
  );
};

export const getImageById = async (id: number) => {
  return await pool.query("SELECT * FROM images_materials WHERE id = $1", [id]);
};

export const createImage = async (materialId: number, imageUrl: string) => {
  return await pool.query(
    "INSERT INTO images_materials (material_id, image_url) VALUES ($1, $2) RETURNING *",
    [materialId, imageUrl]
  );
};

export const updateImage = async (id: number, imageUrl: string) => {
  return await pool.query(
    "UPDATE images_materials SET image_url = $1 WHERE id = $2 RETURNING *",
    [imageUrl, id]
  );
};

export const deleteImage = async (id: number) => {
  return await pool.query("DELETE FROM images_materials WHERE id = $1", [id]);
};
