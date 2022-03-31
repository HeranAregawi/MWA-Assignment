const express = require("express");

const router = express.Router();
const studentsController = require("../controllers/student.controller");

router.route("/students")
.get(studentsController.getAllSutdents);
router.route("/students/:id")
.get(studentsController.getStudent);



module.exports = router;