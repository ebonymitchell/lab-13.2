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

// GET /api/books/:id - Retrieve a single book by ID.
router.get("/:id", async (req, res) => {
    try {
        // Find the book using the ID from the URL.
        const book = await Book.findById(req.params.id);

        // Return HTTP 404 if the book does not exist.
        if (!book) {
            return res.status(404).json({
                message: "Book not found.",
            });
        }

        // Return the requested book.
        return res.status(200).json(book);
    } catch (error) {
        // Handle invalid MongoDB ObjectIds.
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid book ID.",
            });
        }

        // Handle unexpected database errors.
        console.error("Error retrieving book:", error.message);

        return res.status(500).json({
            message: "Failed to retrieve book.",
        });
    }
});



// PUT /api/books/:id - Update an existing book.
router.put("/:id", async (req, res) => {
    try {
        // Find the book by ID and apply the requested updates.
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        // Return HTTP 404 if the book does not exist.
        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found.",
            });
        }

        // Return the updated book.
        return res.status(200).json(updatedBook);
    } catch (error) {
        // Handle invalid MongoDB ObjectIds.
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid book ID or field value.",
            });
        }

        // Handle validation errors and duplicate ISBN values.
        if (error.name === "ValidationError" || error.code === 11000) {
            return res.status(400).json({
                message: error.message,
            });
        }

        // Handle unexpected database errors.
        console.error("Error updating book:", error.message);

        return res.status(500).json({
            message: "Failed to update book.",
        });
    }
});


 // DELETE /api/books/:id - Delete a book by ID.
router.delete("/:id", async (req, res) => {
  try {
    // Find the book by ID and delete it from MongoDB.
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    // Return HTTP 404 if the book does not exist.
    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found.",
      });
    }

    // Confirm that the book was deleted.
    return res.status(200).json({
      message: "Book deleted successfully.",
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectIds.
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid book ID.",
      });
    }

    // Handle unexpected database errors.
    console.error("Error deleting book:", error.message);

    return res.status(500).json({
      message: "Failed to delete book.",
    });
  }
});


// Export the router for use in server.js.
export default router;
