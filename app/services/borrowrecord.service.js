const BorrowRecord = require("../models/borrowrecord.model");
const Book = require("../models/book.model");
const ApiError = require("../api-error");
const Reader = require("../models/reader.model");

const BorrowRecordService = {
  async create(data) {
    const { readerId, bookId } = data;

    const book = await Book.findById(bookId);
    if (!book) throw new ApiError(404, "Không tìm thấy sách");

    const isBorrowed = await BorrowRecord.findOne({
      bookId,
      status: "borrowing",
    });
    if (isBorrowed) {
      throw new ApiError(400, "Sách này đang được mượn");
    }

    const record = new BorrowRecord(data);
    return await record.save();
  },

  async findAll() {
    return await BorrowRecord.find()
      .populate("readerId", "name email")
      .populate("bookId", "title author");
  },

  async findById(id) {
    const record = await BorrowRecord.findById(id)
      .populate("readerId", "name email")
      .populate("bookId", "title author");
    if (!record) throw new ApiError(404, "Không tìm thấy bản ghi mượn");
    return record;
  },

  async update(id, data) {
    const updated = await BorrowRecord.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new ApiError(404, "Không tìm thấy bản ghi để cập nhật");
    return updated;
  },

  async delete(id) {
    const deleted = await BorrowRecord.findByIdAndDelete(id);
    if (!deleted) throw new ApiError(404, "Không tìm thấy bản ghi để xóa");
    return deleted;
  },

  async markAsReturned(id) {
    const record = await BorrowRecord.findById(id);
    if (!record) throw new ApiError(404, "Không tìm thấy bản ghi mượn");

    if (record.status === "đã mượn") {
      throw new ApiError(400, "Sách đã được trả trước đó");
    }

    record.status = "đã trả";
    record.returnDate = new Date();
    await record.save();

    return record;
  },
};

module.exports = BorrowRecordService;
