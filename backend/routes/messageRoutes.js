const express = require("express");

const {
  sendMessage,
  allMessages,
  deleteMessage,
  upload

} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const Message = require("../models/messageModel");
const multerConfig =require('../middleware/multiMiddleware')
router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

router.route("/:messegeId").delete(protect, deleteMessage);

router.route("/uploadfiles").post(protect,multerConfig.single('content'),upload);
module.exports = router;
