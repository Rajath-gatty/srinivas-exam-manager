const db = require('../db');
const fs = require('fs');

exports.getFacultySubjects = async(req,res) => {
    const deptId = req.deptId;
    const {facultyId,courseName,semester} = req.body;

    try {
       let sql = `select id,subj_name,subj_code from faculty_subjects where dept_id=${deptId} and faculty_id='${facultyId}' and course_id=(select course_id from course where course_name='${courseName}') and semester=${semester}`;
       const result = await db.execute(sql);
       res.send(result[0]);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.postMarksAttendance = async(req,res) => {
    const deptId=req.deptId;
    const {courseName,semester,subjectName,subjectCode,studentDetails} = req.body;

    try {
        studentDetails.forEach(async(std)=> {
            await db.execute('insert ignore into marks_attendence(dept_id,course_id,semester,regno,subj_name,subj_code,marks,attendence) values(?,(select course_id from course where course_name=?),?,?,?,?,?,?)',[deptId,courseName,semester,std.regno,subjectName,subjectCode,std.mark,std.attendance])
        })
        res.send('success');
    } catch(err) {
        console.log(err);
    }
}