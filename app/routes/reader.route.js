const ReaderController = require("../controllers/reader.controller");
const express = require("express");
const router = express.Router();

router.post("/", ReaderController.create);
router.get("/", ReaderController.findAll);
router.get("/:id", ReaderController.findOne);
router.put("/:id", ReaderController.update);
router.delete("/:id", ReaderController.delete);

module.exports = router;