import { Request, Response } from "express";
import { Customer } from "../lib/models";
import { connectDB, database } from "../config/db";

export const getCustomers = async (_req: Request, res: Response) => {
    try {
        if (!database) {
            connectDB().catch((error) => {
                return res.status(500).json({
                    message: "Error connecting to database",
                    error: error,
                });
            });
        }

        const customers = await database.collection("customers").find({}).toArray();
        return res.json(customers);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching customers" });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
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

        const customer = await database.collection("customers").findOne({ id });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        return res.status(200).json({ ...customer });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching customer" });
    }
};
