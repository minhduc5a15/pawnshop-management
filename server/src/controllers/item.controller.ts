import { Request, Response } from "express";
import { connectDB, database } from "../config/db";
import { ItemProps } from "../lib/types";
import Item from "../lib/models/item.model";

export const getItems = async (_req: Request, res: Response) => {
    try {
        if (!database) {
            connectDB().catch((error) => {
                return res.status(500).json({
                    message: "Error connecting to database",
                    error: error,
                });
            });
        }

        const items = await database.collection("items").find({}).toArray();
        return res.json(items);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching items" });
    }
};

export const getItemById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (!database) {
            let connected = false;
            connectDB().then(() => {
                connected = true;
            });
            if (!connected) {
                return res.status(500).json({ message: "Error connecting to database" });
            }
        }

        const item = await database.collection("items").findOne({ id });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        return res.status(200).json({ ...item });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching item" });
    }
};

export const createItem = async (req: Request, res: Response) => {
    const { ...data } = req.body as ItemProps;

    if (!database) {
        connectDB().catch((error) => {
            return res.status(500).json({
                message: "Error connecting to database",
                error: error,
            });
        });
    }

    try {
        const item = new Item(data);
        const existingItem = await database.collection("pawned-items").findOne({
            id: item.id,
        });
        if (existingItem) {
            return res.status(409).json({ message: "Item already exists" });
        }
        await item.save();
        return res.status(201).json({ message: "Item created successfully" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
