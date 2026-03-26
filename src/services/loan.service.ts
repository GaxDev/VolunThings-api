import { pool } from "../config/db";

export const getAllLoans = async () => {
  return await pool.query("SELECT * FROM loans ORDER BY id ASC");
};

export const createLoan = async (
  material_id: number,
  borrower_name: string,
  borrower_contact: string,
  loan_date: string
) => {
  return await pool.query(
    "INSERT INTO loans (material_id, borrower_name, borrower_contact, loan_date) VALUES ($1, $2, $3, $4) RETURNING *",
    [material_id, borrower_name, borrower_contact, loan_date]
  );
};

export const getMaterialStatus = async (material_id: number) => {
  return await pool.query("SELECT status FROM materials WHERE id = $1", [material_id]);
};

export const setMaterialLoaned = async (material_id: number) => {
  return await pool.query(
    "UPDATE materials SET status = 'loaned' WHERE id = $1",
    [material_id]
  );
};