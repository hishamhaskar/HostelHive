const express = require("express");
const multer = require("multer");
const { submitComplaint, getAllComplaints } = require("../controllers/complaintsController");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Route for submitting complaints
router.post("/submit-complaint", upload.single("image"), submitComplaint);

// Route to get all complaints
router.get("/all-complaints", getAllComplaints);

module.exports = router;
