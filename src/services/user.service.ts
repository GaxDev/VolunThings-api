import { pool } from "../config/db";

export const allUsers = async () => {
    return await pool.query("SELECT * FROM users_dos");
}