const db = require("../config/db");

// Fetch all rooms with occupant names
const getAllRooms = async (req, res) => {
  try {
    //console.log("Fetching rooms from the database...");

    // Query to fetch rooms with occupant names
    const query = `
     SELECT 
  rooms.id, 
  rooms.roomNo, 
  CASE 
    WHEN COUNT(students.id) >= 3 THEN 0 
    ELSE 1 
  END AS isAvailable,
  GROUP_CONCAT(students.name SEPARATOR ', ') AS occupantNames
FROM rooms
LEFT JOIN students ON rooms.roomNo = students.roomNo
GROUP BY rooms.id;
    `;

    const [rows] = await db.query(query);
    //console.log("Rooms fetched:", rows); // Log the fetched data
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ message: "Error fetching rooms." });
  }
};


const assignStudentToRoom = async (studentId, roomNo) => {
  try {
    // Check the current number of occupants in the room
    const [occupants] = await db.query(
      "SELECT COUNT(*) AS occupantCount FROM students WHERE roomNo = ?",
      [roomNo]
    );

    // Ensure the room is not already full
    if (occupants[0].occupantCount >= 3) {
      throw new Error("Room is already full. Maximum 3 occupants allowed.");
    }

    // Assign the student to the room
    await db.query("UPDATE students SET roomNo = ? WHERE id = ?", [roomNo, studentId]);

    return { success: true, message: "Student assigned to room successfully." };
  } catch (error) {
    console.error("Error assigning student to room:", error);
    throw error;
  }
};
module.exports = { getAllRooms, assignStudentToRoom };