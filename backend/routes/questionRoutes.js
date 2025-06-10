const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { togglePinQuestion, updateQuestionNode, addQuestionToSession } = require("../controllers/questionController");

const router = express.Router();

router.post("/add", protect, addQuestionToSession);
router.post("/:id/pin", protect, togglePinQuestion);
router.post("/:id/note", protect, updateQuestionNode);

module.exports = router;
