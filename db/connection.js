// Import Mongoose to connect to MongoDB.
const mongoose = require("mongoose");

// Define an asynchronous database connection function.
const connectDB = async () => {
    try {
        // Connect to MongoDB Atlas using the environment variable.
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");
    } catch (err) {
        // Display the error and stop the application.
        console.error("Connection error:", err.message);
        process.exit(1);
    }
};

// Export the function for use in server.js.
module.exports = connectDB;
