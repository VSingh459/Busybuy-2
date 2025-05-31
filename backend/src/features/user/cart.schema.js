import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",  // ✅ Links to UserSchema
        required: true,
    },

    products: [
        {
            productId: { type: Number, required: true },  // ✅ Change ObjectId to Number
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
    updatedAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model("cart",cartSchema);
export default Cart;