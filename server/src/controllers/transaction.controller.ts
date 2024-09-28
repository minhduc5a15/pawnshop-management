import { Request, Response } from "express";
import { connectDB, database } from "../config/db";
import { Transaction } from "../lib/models";

export const getTransactions = async (_req: Request, res: Response) => {
    try {
        if (!database) {
            connectDB().catch((error) => {
                return res.status(500).json({
                    message: "Error connecting to database",
                    error: error,
                });
            });
        }

        const transactions = await database.collection("transactions").find({}).toArray();
        return res.json(transactions);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching transactions" });
    }
};

export const getTransactionById = async (req: Request, res: Response) => {
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

        const transaction = await database.collection("transactions").findOne({ id });
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.status(200).json({ ...transaction });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching transaction" });
    }
};

export const createTransaction = async (req: Request, res: Response) => {
    const { id, customerId, pawnedItemId, type, amount, date } = req.body;

    if (!database) {
        let connected = false;
        connectDB().then(() => {
            connected = true;
        });
        if (!connected) {
            return res.status(500).json({ message: "Error connecting to database" });
        }
    }

    const existingTransaction = await database.collection("transactions").findOne({ id });
    if (existingTransaction) {
        return res.status(409).json({ message: "Transaction already exists" });
    }

    const newTransaction = new Transaction({
        id,
        customerId,
        pawnedItemId,
        type,
        amount,
        date,
    });

    try {
        await newTransaction.save();
        return res.status(201).json({ message: "Transaction created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error creating transaction" });
    }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!database) {
        let connected = false;
        connectDB().then(() => {
            connected = true;
        });
        if (!connected) {
            return res.status(500).json({ message: "Error connecting to database" });
        }
    }

    try {
        await database.collection("transactions").deleteOne({ id });
        return res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting transaction" });
    }
};
