import { Router } from "express";
import { createItem, getItems, getItemById } from "../controllers";
import authMiddleware from "../middlewares";

const router = Router();

// router.use("/items", authMiddleware);

// [GET] /api/items
router.get("/items", getItems);

// [GET] /api/items/:id
router.get("/items/:id", getItemById);

// [POST] /api/items/create
router.post("/items/create", createItem);

// [DELETE] /api/items/:id
// router.delete("/items/:id", deletePawnedItem);

export default router;
