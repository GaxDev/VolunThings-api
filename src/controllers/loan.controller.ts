import { Request, Response } from "express";
import {
  getAllLoans,
  createLoan,
  getMaterialStatus,
  setMaterialLoaned,
} from "../services/loan.service";

export const getLoans = async (req: Request, res: Response) => {
  try {
    const result = await getAllLoans();
    res.status(200).json({ ok: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const postLoan = async (req: Request, res: Response) => {
  try {
    const { material_id, borrower_name, borrower_contact, loan_date } = req.body;

    const materialResult = await getMaterialStatus(material_id);

    if (materialResult.rowCount === 0) {
      res.status(404).json({ ok: false, message: "El material no existe" });
      return;
    }

    if (materialResult.rows[0].status === "loaned") {
      res.status(400).json({ ok: false, message: "El material no está disponible" });
      return;
    }

    await setMaterialLoaned(material_id);

    const result = await createLoan(material_id, borrower_name, borrower_contact, loan_date);
    res.status(201).json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};