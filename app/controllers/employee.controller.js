const EmployeeService = require("../services/employee.service");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.employeeCode || !req.body?.name) {
    return next(new ApiError(400, "Mã nhân viên và tên không được để trống"));
  }

  try {
    const employee = await employeeService.createEmployee(req.body);
    return res.status(201).json(employee);
  } catch (error) {
    return next(
      new ApiError(400, error.message || "Không thể tạo nhân viên mới")
    );
  }
};

// [GET] /api/employees
exports.findAll = async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployees();
    return res.json(employees);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi lấy danh sách nhân viên"));
  }
};

// [GET] /api/employees/:id
exports.findOne = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      return next(new ApiError(404, "Không tìm thấy nhân viên"));
    }
    return res.json(employee);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi tìm nhân viên"));
  }
};

// [PUT] /api/employees/:id
exports.update = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );
    if (!employee) {
      return next(new ApiError(404, "Không tìm thấy nhân viên để cập nhật"));
    }
    return res.json(employee);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi cập nhật nhân viên"));
  }
};

// [DELETE] /api/employees/:id
exports.delete = async (req, res, next) => {
  try {
    const employee = await employeeService.deleteEmployee(req.params.id);
    if (!employee) {
      return next(new ApiError(404, "Không tìm thấy nhân viên để xóa"));
    }
    return res.json({ message: "Xóa nhân viên thành công" });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa nhân viên"));
  }
};