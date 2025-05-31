import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",  // ✅ Links order to a user
        required: true,
    },
    products: [
        {
            id: { type: Number, required: true },  // ✅ Use numbers from `data.js`
            title: { type: String, required: true },  // ✅ Product name
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true }
        },
    ],
    totalPrice: { type: Number, required: true },  // ✅ Total price of the order
    orderDate: { type: Date, default: Date.now }  // ✅ Automatically stores order time
});

const Order = mongoose.model("order", orderSchema);
export default Order;