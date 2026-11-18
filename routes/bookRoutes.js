import express from "express";
import Book from "../models/Book.js";

// Create a router for book-related API endpoints.
const router = express.Router();

// POST /api/books - Create a new book.
router.post("/", async (req, res) => {
    try {
        // Create a book using the request body.
        const newBook = new Book(req.body);

        // Save the new book to MongoDB.
        const savedBook = await newBook.save();

        // Return the created book with HTTP 201.
        return res.status(201).json(savedBook);
    } catch (error) {
        // Handle validation errors and duplicate ISBN values.
        if (error.name === "ValidationError" || error.code === 11000) {
            return res.status(400).json({
                message: error.message,
            });
        }

        // Handle unexpected server errors.
        console.error("Error creating book:", error.message);

        return res.status(500).json({
            message: "Failed to create book.",
        });
    }
});

// Export the router for use in server.js.
export default router;
