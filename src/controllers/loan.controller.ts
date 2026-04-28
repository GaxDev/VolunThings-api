import { Request, Response } from "express";
import {
  getAllLoans,
  getLoanById,
  createLoan,
  returnLoan,
  extendLoan,
  deleteLoan,
  updateLoan,
  getMaterialStatus,
  setMaterialLoaned,
  setMaterialAvailable,
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

export const getLoan = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const result = await getLoanById(id);

    if (result.rowCount === 0) {
      res.status(404).json({ ok: false, message: "El préstamo no se ha encontrado" });
      return;
    }

    res.status(200).json({ ok: true, data: result.rows[0] });
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

export const returnLoanById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);

    const loanResult = await getLoanById(id);

    if (loanResult.rowCount === 0) {
      res.status(404).json({ ok: false, message: "El préstamo no se ha encontrado" });
      return;
    }

    if (loanResult.rows[0].status === "returned") {
      res.status(400).json({ ok: false, message: "El préstamo ya se devolvió" });
      return;
    }

    const result = await returnLoan(id);
    await setMaterialAvailable(result.rows[0].material_id);

    res.status(200).json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const extendLoanById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { return_date } = req.body;

    if (!return_date) {
      res.status(400).json({ ok: false, message: "La nueva fecha de devolución es obligatoria" });
      return;
    }

    const loanResult = await getLoanById(id);

    if (loanResult.rowCount === 0) {
      res.status(404).json({ ok: false, message: "El préstamo no se ha encontrado" });
      return;
    }

    if (loanResult.rows[0].status === "returned") {
      res.status(400).json({ ok: false, message: "No se puede modificar un préstamo ya devuelto" });
      return;
    }

    const currentReturnDate = loanResult.rows[0].return_date;
    if (currentReturnDate && new Date(return_date) <= new Date(currentReturnDate)) {
      res.status(400).json({ ok: false, message: "La nueva fecha debe ser posterior a la fecha actual " });
      return;
    }

    const result = await extendLoan(id, return_date);
    res.status(200).json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const deleteLoanById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);

    const loanResult = await getLoanById(id);

    if (loanResult.rowCount === 0) {
      res.status(404).json({ ok: false, message: "El préstamo no se ha encontrado" });
      return;
    }

    if (loanResult.rows[0].status !== "returned") {
      await setMaterialAvailable(loanResult.rows[0].material_id);
    }

    await deleteLoan(id);
    res.status(200).json({ ok: true, message: "El préstamo ha sido eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};

export const updateLoanById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { borrower_name, borrower_contact, loan_date } = req.body;

    if (!borrower_name || !borrower_contact || !loan_date) {
      res.status(400).json({ ok: false, message: "Todos los campos son obligatorios" });
      return;
    }

    const loanResult = await getLoanById(id);

    if (loanResult.rowCount === 0) {
      res.status(404).json({ ok: false, message: "El préstamo no se ha encontrado" });
      return;
    }

    if (loanResult.rows[0].status === "returned") {
      res.status(400).json({ ok: false, message: "No se puede modificar un préstamo ya devuelto" });
      return;
    }

    const result = await updateLoan(id, borrower_name, borrower_contact, loan_date);
    res.status(200).json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
};