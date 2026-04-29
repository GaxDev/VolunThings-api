import { Router } from "express";
import { getLoans, getLoan, postLoan, returnLoanById, extendLoanById } from "../controllers/loan.controller";

const router = Router();

router.get("/", getLoans);
router.get("/:id", getLoan);
router.post("/", postLoan);
router.put("/:id/extend", extendLoanById);
router.put("/:id/return", returnLoanById);

export default router;