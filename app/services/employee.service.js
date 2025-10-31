const Employee = require("../models/employee.model");
const ApiError = require("../api-error");

class EmployeeService {
  async createEmployee(data) {
    const existing = await Employee.findOne({ email: data.email });
    if (existing) {
      throw new ApiError(400, "Email này đã tồn tại");
    }
    const employee = new Employee(data);
    return await employee.save();
  }
    async getAllEmployees() {
    return await Employee.find();
  }
    async getEmployeeById(id) {
    const employee = await Employee.findById(id);
    if (!employee) throw new Error("Không tìm thấy nhân viên");
    return employee;
  }
    async updateEmployee(id, data) {
    const employee = await Employee.findByIdAndUpdate(id, data, { new: true });
    if (!employee) throw new Error("Không tìm thấy nhân viên để cập nhật");
    return employee;
  }
    async deleteEmployee(id) {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) throw new Error("Không tìm thấy nhân viên để xóa");
    return employee;
  }
}

module.exports = EmployeeService;