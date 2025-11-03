const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const borrowRecordSchema = new mongoose.Schema({
  bookCode: {
    type: String,
    required: true,
  },
  readerCode: {
    type: String,
    required: true,
  },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  reader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reader",
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
    enum: ["borrowing", "returned", "overdue"],
    required: true,
    default: "borrowing",
  },
});
const BorrowRecord = mongoose.model("BorrowRecord", borrowRecordSchema);
module.exports = BorrowRecord;
