const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongooseConnection = async () => {
    try {
        // Log the environment variables
        console.log("Port:", process.env.PORT);
        console.log("MongoDB URL:", process.env.MONGO_DB_URL);

        // Check if MONGO_DB_URL is defined
        if (!process.env.MONGO_DB_URL) {
            throw new Error("MONGO_DB_URL is not defined");
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,  // Timeout for initial connection
            socketTimeoutMS: 45000     // Timeout for socket operations
        });
        
        console.log("Connected to MongoDB");

        // Mongoose connection events for better debugging
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to', process.env.MONGO_DB_URL);
        });
        mongoose.connection.on('error', (err) => {
            console.log('Mongoose connection error:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });
    } catch (e) {
        console.error("Error in the mongoose connection:", e.message);
    }
};

module.exports = mongooseConnection;
