const Publisher = require("../models/publisher.model");

class PublisherService {
    async createPublisher(data) {
        const existing = await Publisher.findOne({ name: data.name });
        if (existing) throw new Error("Nhà xuất bản đã tồn tại");
        const publisher = new Publisher(data);
        return await publisher.save();
    }
    async getAllPublishers() {
        return await Publisher.find();
    }
    async getPublisherById(id) {
        const publisher = await Publisher.findById(id);
        if (!publisher) throw new Error("Không tìm thấy nhà xuất bản");
        return publisher;
    }  
    async updatePublisher(id, data) {
        const publisher = await Publisher.findByIdAndUpdate(id, data, { new: true });
        if (!publisher) throw new Error("Không tìm thấy nhà xuất bản để cập nhật");
        return publisher;
    }
    async deletePublisher(id) {
        const publisher = await Publisher.findByIdAndDelete(id);
        if (!publisher) throw new Error("Không tìm thấy nhà xuất bản để xóa");
        return publisher;
    }
}

module.exports = PublisherService;