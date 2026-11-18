// Load environment variables from .env.
import "dotenv/config";

// Import Express and the database connection function.
import express from "express";
import connectDB from "./db/connection.js";

// Create the Express application.
const app = express();

// Enable JSON request body parsing.
app.use(express.json());

// Define the server port.
const PORT = process.env.PORT || 3001;

// Connect to MongoDB before starting the server.
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

// Start the application.
startServer();
