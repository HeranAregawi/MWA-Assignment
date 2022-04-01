const studentsData = require("../data/school.json");

module.exports.getAllSutdents = function(req, res){
    console.log("Get all Students");
    res.status(200).json(studentsData);
};
module.exports.getStudent = function(req, res){
    const {id}= req.params;
    let studentIndex = studentsData.findIndex((stu) => stu.id == id);
    console.log(studentsData[studentIndex]);
    if(studentIndex > -1){
        return res.status(200).json(studentsData[studentIndex]);
    }
    else{
        return res.status(200).json({msg : "Oops, student not found!"});
    }
};

