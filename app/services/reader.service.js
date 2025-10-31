const Reader = require("../models/reader.model");

class ReaderService {
  async createReader(data) {
    const reader = new Reader(data);
    return await reader.save();
  }
  async getAllReaders() {
    return await Reader.find();
  }
  async getReaderById(id) {
    const reader = await Reader.findById(id);
    if (!reader) throw new Error("Không tìm thấy độc giả");
    return reader;
  }
  async updateReader(id, data) {
    const reader = await Reader.find.findByIdAndUpdate(id, data, { new: true });
    if (!reader) throw new Error("Không tìm thấy độc giả để cập nhật");
    return reader;
  }
  async deleteReader(id) {
    const reader = await Reader.findByIdAndDelete(id);
    if (!reader) throw new Error("Không tìm thấy độc giả để xóa");
    return reader;
  }
}

module.exports = ReaderService;
