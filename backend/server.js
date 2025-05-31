import exp from  'express';
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import dotenv from 'dotenv';
import userRouter from './src/features/user/user.routes.js';
import cors from 'cors';

const server = exp();
dotenv.config();
server.use(exp.json());
server.use(exp.urlencoded({ extended: true }));

// Enable CORS for all origins (or restrict it to your frontend URL)
server.use(cors({
    origin: 'http://localhost:3004', // Allow only frontend requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    credentials: true // Allow cookies/session headers if needed
}));

// These are the Routes
server.use('/users', userRouter);




let a = connectUsingMongoose(); 

a.then(function () {
    server.listen(3700, function () {
        console.log('Server is listening at port-3700');
    });
})
.catch(function (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); 
});