import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
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
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        transactionIds: {
            type: [String],
            required: false,
        },
        gender: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

const Customer = mongoose.model("customer", customerSchema);

export default Customer;
