import { Router } from "express";
import { getLoans, postLoan } from "../controllers/loan.controller";

const router = Router();

router.get("/", getLoans);
router.post("/", postLoan);

export default router;