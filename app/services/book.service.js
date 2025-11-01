const Book = require("../models/book.model");
const ApiError = require("../api-error");
class BookService {
  async create(data) {
    const existing = await Book.findOne({ bookcode: data.bookcode });
    if (existing) throw new Error("Mã sách đã tồn tại");
    const book = new Book(data);
    return await book.save();
  }

  async findAll() {
    return await Book.find();
  }

  async findById(id) {
    const book = await Book.findById(id);
    if (!book) throw new Error("Không tìm thấy sách");
    return book;
  }

  async update(id, data) {
    const book = await Book.findByIdAndUpdate(id, data, { new: true });
    if (!book) throw new ApiError(404, "Không tìm thấy sách để cập nhật");
    return book;
  }

  async delete(id) {
    const book = await Book.findByIdAndDelete(id);
    if (!book) throw new Error("Không tìm thấy sách để xóa");
    return book;
  }
};

module.exports = new BookService();
