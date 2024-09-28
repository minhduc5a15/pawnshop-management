import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        pawnedItemId: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Transaction = mongoose.model("transaction", transactionSchema);

export default Transaction;
