const mongoose = require("mongoose");
const Student = mongoose.model(process.env.STUDENT_MODEL);

const getAll = function (req, res) {
    console.log("Get Course controller is called");
    const student_Id = req.params.student_Id;
    Student.findById(student_Id).exec(function (err, student) {
        console.log("Course Found", student.courses);
        res.status(200).json(student.courses);
    })

}
const getOne = function (req, res) {
    console.log("Get Course controller is called");
    const student_Id = req.params.student_Id;
    const course_Id = req.params.course_Id;
    Student.find({_id:student_Id, "course._id" : course_Id } ).exec(function (err, student) {
        console.log("Course Found", student.courses);
        res.status(200).json(student.courses);
    })

}

module.exports = {
    getAll,
    getOne
}