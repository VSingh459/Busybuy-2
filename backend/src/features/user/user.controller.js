import {ApplicationError} from "../../error-handler/applicationError.js";
import UserRepository from "./user.repository.js";
import jwt from 'jsonwebtoken';


export default class UserController{

    signup(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            const error = new ApplicationError("All fields are required.", 400);
            throw error;
        }

        return UserRepository.signup(name, email, password)
            .then(function (user) {
                // ✅ Generate a JWT token upon successful signup
                const token = jwt.sign(
                    { userId: user._id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' } 
                );

                // ✅ Return token instead of user object
                res.status(201).send( token );
            })
            .catch(function (error) {
                if (error instanceof ApplicationError) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                console.error('Error in signup controller:', error);
                res.status(500).send({ message: 'An internal server error occurred.' });
            });
    }

    login(req,res)
    {
        const email = req.body.email;
        const password = req.body.password;

        // Validate inputs
        if (!email || !password) {
            const error = new ApplicationError("Email and password are required.", 400);
            throw error; // This should be caught by global error handling middleware
        }
    
        UserRepository.login(email, password)
    .then(function ({ user, cart, orders }) {
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );
        return res.status(200).json({ token, cart, orders });
    }).catch(function (error) {
                if (error instanceof ApplicationError) {
                    return res.status(error.statusCode).send(error.message);
                }
                console.error('Error in signin controller:', error);
                return res.status(500).send('An error occurred while signing in.');
            });
    }

    logout(req, res) {
        console.log("Logout Hit in Controller");
    
        // const token = req.headers.authorization?.split(" ")[1];  
        const token = req.headers.authorization;
        const cart = req.body.cart;
        const orders = req.body.orders;
    
        if (!token) {
            return res.status(400).send({ message: 'Token is required for logout.' });
        }
    
        const decoded = jwt.decode(token);  // ✅ Decode token to get userId
    
        if (!decoded || !decoded.userId) {
            return res.status(400).send({ message: 'Invalid token. No user ID found.' });
        }
    
        const expiryTime = new Date(decoded.exp * 1000);
        const userId = decoded.userId;  // ✅ Extract userId from token
    
        return UserRepository.logout(token, expiryTime, userId, cart, orders)
            .then(function(result) {
                res.status(200).send({ message: 'Successfully logged out.', result });
            })
            .catch(function(error) {
                console.error('Error during logout:', error);
                res.status(500).send({ message: 'An error occurred while processing your request. Please try again later.' });
            });
    }
    
}