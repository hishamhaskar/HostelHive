const express = require("express");
// const multer = require("multer");
const { addNotice, getNotices } = require("../controllers/noticesController");

const router = express.Router();

// Route for adding a new notice
router.post("/add-notice", addNotice);

router.get("/get-notices", getNotices);

module.exports = router;
