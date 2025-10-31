const publisherService = require("../services/publisher.service");
const ApiError = require("../api-error");

// [POST] /api/publishers
exports.create = async (req, res, next) => {
  if (!req.body?.publisherCode || !req.body?.name) {
    return next(
      new ApiError(400, "Mã nhà xuất bản và tên không được để trống")
    );
  }

  try {
    const publisher = await publisherService.createPublisher(req.body);
    return res.status(201).json(publisher);
  } catch (error) {
    return next(
      new ApiError(400, error.message || "Không thể tạo nhà xuất bản mới")
    );
  }
};

// [GET] /api/publishers
exports.findAll = async (req, res, next) => {
  try {
    const publishers = await publisherService.getAllPublishers();
    return res.json(publishers);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi lấy danh sách nhà xuất bản"));
  }
};

// [GET] /api/publishers/:id
exports.findOne = async (req, res, next) => {
  try {
    const publisher = await publisherService.getPublisherById(req.params.id);
    if (!publisher) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }
    return res.json(publisher);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi tìm nhà xuất bản"));
  }
};

// [PUT] /api/publishers/:id
exports.update = async (req, res, next) => {
  try {
    const publisher = await publisherService.updatePublisher(
      req.params.id,
      req.body
    );
    if (!publisher) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản để cập nhật"));
    }
    return res.json(publisher);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi cập nhật nhà xuất bản"));
  }
};

// [DELETE] /api/publishers/:id
exports.delete = async (req, res, next) => {
  try {
    const publisher = await publisherService.deletePublisher(req.params.id);
    if (!publisher) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản để xóa"));
    }
    return res.json({ message: "Xóa nhà xuất bản thành công" });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa nhà xuất bản"));
  }
};
