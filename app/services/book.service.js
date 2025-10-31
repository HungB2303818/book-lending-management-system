const Book = require("../models/book.model");

const BookService = {
  async createBook(data) {
    const existing = await Book.findOne({ bookcode: data.bookcode });
    if (existing) throw new Error("Mã sách đã tồn tại");
    const book = new Book(data);
    return await book.save();
  },

  async getAllBooks() {
    return await Book.find();
  },

  async getBookById(id) {
    const book = await Book.findById(id);
    if (!book) throw new Error("Không tìm thấy sách");
    return book;
  },

  async updateBook(id, data) {
    const book = await Book.findByIdAndUpdate(id, data, { new: true });
    if (!book) throw new Error("Không tìm thấy sách để cập nhật");
    return book;
  },

  async deleteBook(id) {
    const book = await Book.findByIdAndDelete(id);
    if (!book) throw new Error("Không tìm thấy sách để xóa");
    return book;
  },
};

module.exports = BookService;
