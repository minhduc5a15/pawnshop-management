import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        value: {
            type: Number,
            required: true,
        },
        pawnedAmount: {
            type: Number,
            required: true,
        },
        pawnedDate: {
            type: Date,
            required: true,
        },
        redemptionDate: {
            type: Date,
            required: false,
        },
        interestRate: {
            type: Number,
            required: true,
        },
        customerId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Item = mongoose.model("item", itemSchema);

export default Item;
