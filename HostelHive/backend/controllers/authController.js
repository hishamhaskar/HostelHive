const bcrypt = require("bcrypt");
const db = require("../config/db"); // Import the database connection

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user is the admin
    if (username === process.env.ADMIN_USERNAME) {
      // Compare the provided password with the hashed admin password
      const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);

      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      // If valid, send a success response for admin
      return res.json({
        message: "Admin login successful",
        token: "exampleAdminToken", // Generate a JWT or similar token
        user: {
          id: 1, // Hardcoded admin ID
          username: process.env.ADMIN_USERNAME,
          role: "admin", // Hardcoded admin role
        },
      });
    }

    // If not admin, check if the user is a student
    const [students] = await db.query("SELECT * FROM students WHERE username = ?", [username]);

    if (students.length === 0) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const student = students[0];

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // If valid, send a success response for student
    res.json({
      message: "Student login successful",
      token: "exampleStudentToken", // Generate a JWT or similar token
      user: {
        id: student.id,
        username: student.username,
        role: "student", // Hardcoded student role
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
};

module.exports = { login };