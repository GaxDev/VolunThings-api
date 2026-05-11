import { Router } from "express";
import { getLoans, getLoan, postLoan, returnLoanById, extendLoanById, deleteLoanById, updateLoanById } from "../controllers/loan.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getLoans);
router.get("/:id", authMiddleware, getLoan);
router.post("/", authMiddleware, postLoan);
router.put("/:id/extend", authMiddleware, extendLoanById);
router.put("/:id/return", authMiddleware, returnLoanById);
router.put("/:id", authMiddleware, updateLoanById);
router.delete("/:id", authMiddleware, deleteLoanById);

export default router;