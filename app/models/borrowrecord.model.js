const borrowRecordSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
    borrowerName: {
    type: String,
    required: true,
  },
    borrowDate: {
    type: Date,
    required: true,
    default: Date.now,
  },   
    returnDate: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: ["đang mượn", "đã trả", "quá hạn"],
    required: true,
    default: "đang mượn",
  },
});
const BorrowRecord = mongoose.model("BorrowRecord", borrowRecordSchema);
module.exports = BorrowRecord;