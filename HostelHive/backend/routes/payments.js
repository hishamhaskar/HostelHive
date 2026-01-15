const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get mess fee for a student by rollNo
router.get("/mess-fee/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch messFee from the database
    const [result] = await db.query(
      "SELECT messFee FROM students WHERE username = ?",[username]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ messFee: result[0].messFee });
  } catch (err) {
    console.error("Error fetching mess fee:", err);
    res.status(500).json({ error: "Failed to retrieve mess fee" });
  }
});

module.exports = router;
