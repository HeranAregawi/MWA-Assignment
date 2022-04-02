const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controllers");
const courseController = require("../controllers/course.controllers");

router.route("/students")
    .get(studentController.getAll)

router.route("/students/:student_Id")
    .get(studentController.getOne)

router.route("/students/:student_Id/courses")
.get(courseController.getAll);

module.exports = router;