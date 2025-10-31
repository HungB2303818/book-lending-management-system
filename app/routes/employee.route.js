const EmployeeController = require("../controllers/employee.controller");
const express = require("express");
const router = express.Router();

router.post("/", EmployeeController.create);
router.get("/", EmployeeController.findAll);
router.get("/:id", EmployeeController.findOne);
router.put("/:id", EmployeeController.update);
router.delete("/:id", EmployeeController.delete);

module.exports = router;
