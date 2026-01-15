const express = require("express");
const db = require('../config/db');
const { registerStudent, getStudents, updateAttendance, updateMessFee, deleteStudent } = require("../controllers/studentController");
//const studentController = require('../controllers/studentController');
const router = express.Router();

router.post("/students", registerStudent);
router.get("/students", getStudents);
router.put("/students/:rollNo/attendance", updateAttendance);
router.put("/students/messFee", updateMessFee); // New endpoint for mess fee
router.delete("/students/:rollNo", deleteStudent);
module.exports = router;
