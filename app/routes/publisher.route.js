const PublisherController = require("../controllers/publisher.controller");
const express = require("express");
const router = express.Router();

router.post("/", PublisherController.create);
router.get("/", PublisherController.findAll);
router.get("/:id", PublisherController.findOne);
router.put("/:id", PublisherController.update);
router.delete("/:id", PublisherController.delete);

module.exports = router;