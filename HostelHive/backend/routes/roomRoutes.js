const express = require("express");
const { getAllRooms,assignStudentToRoom } = require("../controllers/roomController");

const router = express.Router();

// Fetch all rooms
router.get("/rooms", getAllRooms);
router.put("/rooms", assignStudentToRoom);

module.exports = router;
