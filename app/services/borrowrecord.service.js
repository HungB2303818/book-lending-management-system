const BorrowRecord = require("../models/borrowrecord.model");
const Book = require("../models/book.model");
const ApiError = require("../api-error");
const Reader = require("../models/reader.model");

const BorrowRecordService = {
  async create(data) {
    const { readerCode, bookCode, quantity } = data;

    // 1️⃣ Kiểm tra bạn đọc
    const reader = await Reader.findOne({ readerCode });
    if (!reader) {
      throw new ApiError(404, "Không tìm thấy bạn đọc");
    }

    // 2️⃣ Kiểm tra sách
    const book = await Book.findOne({ bookCode });
    if (!book) {
      throw new ApiError(404, "Không tìm thấy sách");
    }

    // 3️⃣ Kiểm tra số lượng còn lại
    if (book.quantity < quantity) {
      throw new ApiError(400, "Không đủ số lượng sách để mượn");
    }

    // 4️⃣ Tạo bản ghi mượn
    const record = new BorrowRecord({
      readerCode,
      bookCode,
      reader: reader._id,
      book: book._id,
      quantity,
      returnDate: data.returnDate,
      status: data.status,
    });

    // 5️⃣ Giảm số lượng sách còn lại
    book.quantity -= quantity;
    await book.save();

    // 6️⃣ Lưu phiếu mượn
    await record.save();

    return record;
  },

  async findAll() {
    return await BorrowRecord.find()
      .populate("reader", "name readerCode")
      .populate("book", "bookCode title author");
  },

  async findById(id) {
    const record = await BorrowRecord.findById(id)
      .populate("reader", "name email")
      .populate("book", "title author");
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

    if (record.status === "returned") {
      throw new ApiError(400, "Sách đã được trả trước đó");
    }

    record.status = "returned";
    record.returnDate = new Date();
    await record.save();

    return record;
  },
};

module.exports = BorrowRecordService;
