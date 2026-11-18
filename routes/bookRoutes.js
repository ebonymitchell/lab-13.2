import express from "express";
import Book from "../models/Book.js";

// Create the Express router.
const router = express.Router();

// POST /api/books - Create a new book.
router.post("/", async (req, res) => {
    try {
        // Create a new book using the request body.
        const newBook = new Book(req.body);

        // Save the book to MongoDB.
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

// GET /api/books - Retrieve all books.
router.get("/", async (req, res) => {
    try {
        // Retrieve all books from MongoDB.
        const books = await Book.find();

        // Return the books as a JSON array.
        return res.status(200).json(books);
    } catch (error) {
        // Handle unexpected database errors.
        console.error("Error retrieving books:", error.message);

        return res.status(500).json({
            message: "Failed to retrieve books.",
        });
    }
});

// Export the router for use in server.js.
export default router;
