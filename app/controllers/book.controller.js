const BookService = require("../services/book.service");
const ApiError = require("../api-error");

// [POST] /api/books
exports.create = async (req, res, next) => {
  if (!req.body?.title) {
    return next(new ApiError(400, "Title cannot be empty"));
  }

  try {
    const book = await BookService.create(req.body);
    return res.status(201).json(book);
  } catch (error) {
    return next(new ApiError(500, "Error creating book"));
  }
};

// [GET] /api/books
exports.findAll = async (req, res, next) => {
  try {
    const books = await BookService.findAll();
    return res.json(books);
  } catch (error) {
    return next(new ApiError(500, "Error retrieving books"));
  }
};

// [GET] /api/books/:id
exports.findOne = async (req, res, next) => {
  try {
    const book = await BookService.findById(req.params.id);
    if (!book) {
      return next(new ApiError(404, "Book not found"));
    }
    return res.json(book);
  } catch (error) {
    return next(new ApiError(500, "Error finding book"));
  }
};

// [PUT] /api/books/:id
exports.update = async (req, res, next) => {
  try {
    const updatedBook = await BookService.update(req.params.id, req.body);
    if (!updatedBook) {
      return next(new ApiError(404, "Book not found"));
    }
    return res.json(updatedBook);
  } catch (error) {
    return next(new ApiError(500, "Error updating book"));
  }
};

// [DELETE] /api/books/:id
exports.delete = async (req, res, next) => {
  try {
    const deletedBook = await BookService.delete(req.params.id);
    if (!deletedBook) {
      return next(new ApiError(404, "Book not found"));
    }
    return res.json({ message: "Book deleted successfully" });
  } catch (error) {
    return next(new ApiError(500, "Error deleting book"));
  }
};
