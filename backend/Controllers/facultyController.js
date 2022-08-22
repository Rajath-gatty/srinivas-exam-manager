const db = require('../db');
const fs = require('fs');

exports.getFacultySubjects = async(req,res) => {
    const deptId = req.deptId;
    const {facultyId,courseName,semester,className} = req.body;

    try {
        let sql;
        if(className) {
            sql = `select id,subj_name,subj_code from faculty_subjects where dept_id=${deptId} and faculty_id='${facultyId}' and course_id=(select course_id from course where course_name='${courseName}') and semester=(select semester from classroom where name='${className}')`;
        } else {
            sql = `select id,subj_name,subj_code from faculty_subjects where dept_id=${deptId} and faculty_id='${facultyId}' and course_id=(select course_id from course where course_name='${courseName}') and semester=${semester}`;
        }
       const result = await db.execute(sql);
       console.log(result[0]);
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

exports.postSemesterMark = async (req,res) => {
    const deptId = req.deptId;
    const facultyId = req.userId;
    const {courseName,classroomName,subjectName,subjectCode,studentDetails} = req.body;
    const uid = (Math.random() + 1).toString(25).substring(2);
    try {
        studentDetails.forEach(async(std)=> {
            await db.execute('insert ignore into semester_marks(dept_id,course_id,class_id,classroom_id,semester,regno,subj_name,subj_code,marks,faculty_id) values(?,(select course_id from course where course_name=?),(select class_id from classroom where name=?),?,(select semester from classroom where name=?),?,?,?,?,?)',[deptId,courseName,classroomName,uid,classroomName,std.regno,subjectName,subjectCode,std.mark,facultyId])
        })
        res.send('success');
    } catch(err) {
        console.log(err);
    }
}

exports.postFetchClassroomMarks = async(req,res) => {
    const facultyId = req.userId;
    try {
       const result = await db.execute("select classroom_id as id,course_name,semester,subj_name,subj_code,date_format(convert_tz(created_at,@@session.time_zone,'+05:30'),'%d %b-%Y') created_at from semester_marks as s join course on s.course_id=course.course_id where faculty_id=? group by classroom_id;",[facultyId]);
    res.send(result[0]);
    } catch(err) {
        console.log(err);
    }
}

exports.postFetchStudentSemMarks = async(req,res) => {
    const facultyId = req.userId;
    const classroomId = req.body.classroomId;
    console.log(facultyId,classroomId);
    try {
       const result = await db.execute("select id,semester_marks.regno,first_name,last_name,semester_marks.semester,subj_name,marks from semester_marks join student on semester_marks.regno=student.regno where faculty_id=? and classroom_id=?;",[facultyId,classroomId]);
       console.log(result[0]);
        res.send(result[0]);
    } catch(err) {
        console.log(err);
    }
}

