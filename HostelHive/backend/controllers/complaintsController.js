const path = require("path");
const db = require("../config/db"); // Import the promise-enabled DB connection

// Handle complaint submission
const submitComplaint = async (req, res) => {
  const { complaintText } = req.body;
  const image = req.file; // Multer handles file upload

  try {
    let imagePath = null;
    if (image) {
      imagePath = path.join("uploads", image.filename);
    }

    // Insert the complaint into the database using promises
    const [result] = await db.query(
      "INSERT INTO complaints (complaintText, imagePath) VALUES (?, ?)",
      [complaintText, imagePath]
    );

    res.status(200).json({ message: "Complaint submitted successfully!", id: result.insertId });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ message: "Failed to submit complaint." });
  }
};

// Get all complaints for admin
const getAllComplaints = async (req, res) => {
  try {
    const [complaints] = await db.query("SELECT * FROM complaints");
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Failed to fetch complaints." });
  }
};

module.exports = { submitComplaint, getAllComplaints };
