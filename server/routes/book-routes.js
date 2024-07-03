const express = require("express");
const router = express.Router();
const Book = require("../model/Book");
const booksController = require("../controllers/books-controller");

// GET all books
router.get("/", booksController.getAllBooks);

// POST a new book
router.post("/", booksController.addBook);

// GET a book by ID
router.get("/:id", booksController.getById);

// PUT (update) a book by ID
router.put("/:id", booksController.updateBook);

// DELETE a book by ID
router.delete("/:id", booksController.deleteBook);

module.exports = router;
