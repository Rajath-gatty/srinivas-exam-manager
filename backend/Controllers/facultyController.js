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


