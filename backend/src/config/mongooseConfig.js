import mongoose from 'mongoose';
import dotenv from 'dotenv';

export function connectUsingMongoose() {
    return mongoose.connect(process.env.DB_URL)
    .then(function () {
        console.log("Mongodb connected using mongoose");
    })
    .catch(function (err) {
        console.log("Error while connecting to db");
        console.error(err);
    });
}