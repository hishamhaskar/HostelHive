const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Ensure you have a proper MySQL database connection

// Fetch all students with attendance details
router.get("/", (req, res) => {
  const query = "SELECT id, name, rollNo, roomNo, attendance FROM students";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ error: "Failed to fetch student data" });
    }
    res.json(results);
  });
});

// Increment attendance for a specific student
router.post("/increment", (req, res) => {
  const { rollNo } = req.body;
  
  if (!rollNo) {
    return res.status(400).json({ error: "Roll number is required" });
  }

  const query = "UPDATE students SET attendance = attendance + 1 WHERE rollNo = ?";
  
  db.query(query, [rollNo], (err, result) => {
    if (err) {
      console.error("Error updating attendance:", err);
      return res.status(500).json({ error: "Failed to update attendance" });
    }
    res.json({ message: "Attendance updated successfully" });
  });
});

// Generate mess fees based on attendance
router.post("/generate-mess-fee", (req, res) => {
  const messFeePerDay = 145;
  const query = "UPDATE students SET messFee = attendance * ?";
  
  db.query(query, [messFeePerDay], (err, result) => {
    if (err) {
      console.error("Error generating mess fees:", err);
      return res.status(500).json({ error: "Failed to generate mess fees" });
    }
    res.json({ message: "Mess fees calculated successfully" });
  });
});

module.exports = router;