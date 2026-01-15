const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerStudent = async (req, res) => {
  const { name, rollNo, phone, roomNo, personalDetails, username, password } = req.body;

  try {
    // Check if the room is full
    const [occupants] = await db.query(
      "SELECT COUNT(*) AS occupantCount FROM students WHERE roomNo = ?",
      [roomNo]
    );

    if (occupants[0].occupantCount >= 3) {
      return res.status(400).json({ error: "Room is already full. Maximum 3 occupants allowed." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert student into the database
    const [result] = await db.query(
      "INSERT INTO students (name, rollNo, phone, roomNo, personalDetails, username, password, attendance, messFee) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0)",
      [name, rollNo, phone, roomNo, personalDetails, username, hashedPassword]
    );

    res.status(201).json({
      message: "Student registered successfully",
      id: result.insertId,
      username,
    });
  } catch (err) {
    console.error("Error registering student:", err);

    // Handle specific database errors
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Username or roll number already exists." });
    }

    res.status(500).json({ error: "Failed to register student" });
  }
};

// Fetch student details
const getStudents = async (req, res) => {
  try {
    const [students] = await db.query("SELECT id, name, rollNo, roomNo, attendance, messFee FROM students");
    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// Update attendance
const updateAttendance = async (req, res) => {
  const { rollNo } = req.params;
  const { attendance } = req.body;

  try {
    const [result] = await db.query("UPDATE students SET attendance = ? WHERE rollNo = ?", [attendance, rollNo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Attendance updated successfully" });
  } catch (err) {
    console.error("Error updating attendance:", err);
    res.status(500).json({ error: "Failed to update attendance" });
  }
};

// **New: Update Mess Fee**
const updateMessFee = async (req, res) => {
  const messFeePerDay = 145;

  try {
    const [students] = await db.query("SELECT rollNo, attendance FROM students");

    for (const student of students) {
      const messFee = student.attendance * messFeePerDay;
      await db.query("UPDATE students SET messFee = ? WHERE rollNo = ?", [messFee, student.rollNo]);
    }

    res.status(200).json({ message: "Mess fees updated successfully" });
  } catch (err) {
    console.error("Error updating mess fees:", err);
    res.status(500).json({ error: "Failed to update mess fees" });
  }
};

const getRoomsWithStudents = async (req, res) => {
  try {
    // Fetch rooms
    const [rooms] = await db.query("SELECT * FROM rooms");

    // Fetch students and group them by roomNo
    const [students] = await db.query("SELECT id, name, rollNo, roomNo FROM students");

    const roomData = rooms.map(room => ({
      ...room,
      students: students.filter(student => student.roomNo === room.roomNo),
    }));

    res.status(200).json(roomData);
  } catch (err) {
    console.error("Error fetching rooms with students:", err);
    res.status(500).json({ error: "Failed to fetch room data" });
  }
};

// Delete Student by Roll No
const deleteStudent = async (req, res) => {
  const { rollNo } = req.params;

  if (!rollNo) {
    return res.status(400).json({ message: "Student Roll No is required" });
  }

  try {
    // First get the student to return their details after deletion
    const [student] = await db.query("SELECT * FROM students WHERE rollNo = ?", [rollNo]);
    console.log("entered")
    if (student.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete the student
    const [result] = await db.query("DELETE FROM students WHERE rollNo = ?", [rollNo]);

    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to delete student" });
    }

    res.status(200).json({ 
      message: "Student deleted successfully", 
      deletedStudent: student[0] 
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Failed to delete student" });
  }
};


module.exports = { registerStudent, getStudents, updateAttendance, updateMessFee, getRoomsWithStudents, deleteStudent };


// module.exports = { registerStudent, getStudents, updateAttendance, updateMessFee };
