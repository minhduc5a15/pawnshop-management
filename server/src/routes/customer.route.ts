import authMiddleware from "../middlewares";
import { Router } from "express";

import { getCustomers, getCustomerById } from "../controllers";

const router = Router();

// router.use("/customers", authMiddleware);

// [GET] /api/customers
router.get("/customers", getCustomers);

router.get("/customers/:id", getCustomerById);

export default router;