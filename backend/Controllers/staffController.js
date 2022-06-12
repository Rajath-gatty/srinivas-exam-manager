const db = require('../db');

exports.getStudentApproveList = async(req,res) => {
    const {courseName,deptId} = req.body;
    try {
        let sql;
        if(!courseName) {
            sql = `select regno,first_name,last_name,course_name,joining_year from student join course on student.course_id=course.course_id where student.dept_id=${deptId} and student.status='pending'`;
        } else {
            sql = `select regno,first_name,last_name,course_name,joining_year from student join course on student.course_id=course.course_id where student.dept_id=${deptId} and course.course_name='${courseName}' and student.status='pending'`;
        }
       const result = await db.execute(sql);
       res.send(result[0]);
    } catch(err) {
        res.status(500).send(err);
        console.log(err);
    }
}

exports.getApproveStudentDetail = async(req,res) => {
    const id = req.param.id;
    try {
        await db.execute(`select * from student where regno='${id}'`);
        res.status(200).send({success:true});
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.getApproveStudent = async(req,res) => {
    const id = req.param.id;
    try {
        await db.execute(`update student set status='approved' where regno='${id}'`);
        res.status(200).send({success:true});
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.getRejectStudent = async(req,res) => {
    try {
        await db.execute(`delete from student where regno='${id}'`);
        res.status(200).send({success:true});
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.getFacultyApproveList = async(req,res) => {
    const {deptId} = req.body;
    try {
        const sql = `select faculty_id,first_name,last_name,joining_year from faculty where dept_id=${deptId} and faculty.status='pending'`;
       const result = await db.execute(sql);
       res.send(result[0]);
    } catch(err) {
        res.status(500).send(err);
        console.log(err);
    }
}

exports.postApproveFaculty = async(req,res) => {
    res.send('Hello');
}

exports.postRejectFaculty = async(req,res) => {
    res.send('Hello');
}