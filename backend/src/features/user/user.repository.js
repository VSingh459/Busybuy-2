import { ApplicationError } from "../../error-handler/applicationError.js";
import user from './user.schema.js';
import bcrypt from 'bcrypt';
import blackListSchema from "./blacklist.schema.js";
import mongoose from 'mongoose';
import Cart from './cart.schema.js';
import Order from './order.schema.js';

const blacklist = mongoose.model('block',blackListSchema);

export default class UserRepository{

    static signup(name, email, password) {
        // Password validation
        if (
            typeof password !== 'string' ||
            password.length < 8 ||
            password.length > 25 ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password)
        ) {
            return Promise.reject(new ApplicationError('Password should be between 8-25 characters and have a special character', 400));
        }

        // Hash password before saving
        return bcrypt.hash(password, 12)
            .then(function (hashedPassword) {
                // Create new user
                var newUser = new user({ name: name, email: email, password: hashedPassword });

                return newUser.save();
            })
            .then(function (savedUser) {
                return savedUser; // Return the saved user
            })
            .catch(function (error) {
                if (error.code === 11000) { 
                    throw new ApplicationError("The email " + email + " is already registered.", 400);
                }
                console.error("Error in repository: ", error);
                throw error;
            });
    }

    static async login(email, password) {
        const foundUser = await user.findOne({ email });
      
        if (!foundUser) {
          throw new ApplicationError('User not found', 400);
        }
      
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
          throw new ApplicationError('Incorrect password', 400);
        }
      
        // ✅ Fetch and format cart with productId and quantity
        const cartDoc = await Cart.findOne({ userId: foundUser._id }).lean();
      
        const cart = cartDoc
          ? cartDoc.products.map(p => ({
              productId: p.productId,   // ✅ required for enrichment
              quantity: p.quantity,
            }))
          : [];
      
        // ✅ Fetch all orders for this user
        const orders = await Order.find({ userId: foundUser._id });
      
        return { user: foundUser, cart, orders };
      }
      

    
      static async logout(token, expiryTime, userId, cart, orders) {
        console.log("Logout hit in Repo");
    
        if (!userId) {
            throw new ApplicationError("User ID is required for logout.", 400);
        }
    
        // ✅ Save Cart
        if (cart.length > 0) {
            try {
                const savedCart = await Cart.findOneAndUpdate(
                    { userId },
                    { products: cart.map(item => ({ productId: item.id, quantity: item.quantity })) },
                    { upsert: true, new: true }
                );
                console.log("Cart Saved:", savedCart);
            } catch (error) {
                console.error("Error saving cart:", error);
            }
        }
    
        // ✅ Save Orders
        if (orders.length > 0) {
            try {
                const savedOrders = await Order.insertMany(
                    orders.map(order => ({
                        userId,
                        products: order.products.map(product => ({
                            id: product.id,
                            title: product.title,
                            quantity: product.quantity,
                            price: product.price
                        })),
                        totalPrice: order.totalPrice,
                        orderDate: order.date || new Date()
                    }))
                );
                console.log("Orders Saved:", savedOrders);
            } catch (error) {
                console.error("Error saving orders:", error);
            }
        }
    
        // ✅ Blacklist Token
        try {
            const blacklistEntry = new blacklist({ token, expiresAt: expiryTime });
            const savedBlacklist = await blacklistEntry.save();
            console.log("Token blacklisted:", savedBlacklist);
            return { cart: "Saved", orders: "Saved", token: "Blacklisted" };
        } catch (error) {
            console.error("Error blacklisting token:", error);
            throw new ApplicationError("Failed to blacklist token.", 500);
        }
    }
    
    
}