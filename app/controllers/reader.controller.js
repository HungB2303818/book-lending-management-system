const readerService = require("../services/reader.service");
const ApiError = require("../api-error");

// [POST] /api/readers
exports.create = async (req, res, next) => {
  if (!req.body?.readerCode || !req.body?.name) {
    return next(new ApiError(400, "Mã bạn đọc và tên không được để trống"));
  }

  try {
    const reader = await readerService.createReader(req.body);
    return res.status(201).json(reader);
  } catch (error) {
    return next(
      new ApiError(400, error.message || "Không thể tạo bạn đọc mới")
    );
  }
};

// [GET] /api/readers
exports.findAll = async (req, res, next) => {
  try {
    const readers = await readerService.getAllReaders();
    return res.json(readers);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi lấy danh sách bạn đọc"));
  }
};

// [GET] /api/readers/:id
exports.findOne = async (req, res, next) => {
  try {
    const reader = await readerService.getReaderById(req.params.id);
    if (!reader) {
      return next(new ApiError(404, "Không tìm thấy bạn đọc"));
    }
    return res.json(reader);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi tìm bạn đọc"));
  }
};

// [PUT] /api/readers/:id
exports.update = async (req, res, next) => {
  try {
    const reader = await readerService.updateReader(req.params.id, req.body);
    if (!reader) {
      return next(new ApiError(404, "Không tìm thấy bạn đọc để cập nhật"));
    }
    return res.json(reader);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi cập nhật bạn đọc"));
  }
};

// [DELETE] /api/readers/:id
exports.delete = async (req, res, next) => {
  try {
    const reader = await readerService.deleteReader(req.params.id);
    if (!reader) {
      return next(new ApiError(404, "Không tìm thấy bạn đọc để xóa"));
    }
    return res.json({ message: "Xóa bạn đọc thành công" });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa bạn đọc"));
  }
};
