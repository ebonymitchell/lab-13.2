import mongoose from "mongoose";

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

// Export the database connection function.
export default connectDB;
