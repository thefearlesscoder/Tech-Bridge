import mongoose from "mongoose";

const Productschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
},{timestamps:true});

export const Purchase = mongoose.model("Purchase", Productschema);