import mongoose from "mongoose";

// Define the structure and validation rules for a book.
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    isbn: {
        type: String,
        unique: true,
    },

    publishedDate: {
        type: Date,
    },

    inStock: {
        type: Boolean,
        default: true,
    },
});

// Compile the schema into a Mongoose model.
const Book = mongoose.model("Book", bookSchema);

// Export the model for use in API routes.
export default Book;
