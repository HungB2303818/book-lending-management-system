const BorrowRecordController = require("../controllers/borrowrecord.controller");
const express = require("express");
const router = express.Router();

router.post("/", BorrowRecordController.create);
router.get("/", BorrowRecordController.findAll);
router.get("/:id", BorrowRecordController.findOne);
router.put("/:id", BorrowRecordController.update);
router.delete("/:id", BorrowRecordController.delete);
router.post("/:id/return", BorrowRecordController.markAsReturned);

module.exports = router;