const db = require("../config/db"); // Import the promise-enabled DB connection

// Handle adding a new notice
const addNotice = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    // Insert the notice into the database
    const [result] = await db.query(
      "INSERT INTO notices (title, content) VALUES (?, ?)",
      [title, content]
    );

    res.status(201).json({ message: "Notice added successfully!", id: result.insertId });
  } catch (error) {
    console.error("Error adding notice:", error);
    res.status(500).json({ message: "Failed to add notice." });
  }
};

// Get all notices
const getNotices = async (req, res) => {
  try {
    const [notices] = await db.query("SELECT * FROM notices");
    res.status(200).json(notices);
   // console.log("Notice Data:", notice);

  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ message: "Failed to fetch notices." });
  }
};

module.exports = { addNotice, getNotices };
