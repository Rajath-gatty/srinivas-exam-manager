const db = require('../db');

exports.getStudentApproveList = async(req,res) => {
    const {courseName} = req.body;
    const deptId = req.deptId;
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
    const id = req.params.id;
    try {
        const result = await db.execute(`select student.*,dept_name,course_name from student join department on student.dept_id=department.dept_id join course on student.course_id=course.course_id where regno='${id}'`);
        res.status(200).send(result[0]);
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.postApproveStudent = async(req,res) => {
    const id = req.params.id;
    try {
       const result = await db.execute(`update student set status='approved' where regno='${id}'`);
        res.status(200).send({success:true,data:result});
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.postRejectStudent = async(req,res) => {
    const id = req.params.id;
    try {
        const result = await db.execute(`delete from student where regno='${id}'`);
        res.status(200).send({success:true,data:result[0]});
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.getFacultyApproveList = async(req,res) => {
    const deptId = req.deptId;
    try {
        const sql = `select faculty_id,first_name,last_name,joining_year from faculty where dept_id=${deptId} and faculty.status='pending'`;
       const result = await db.execute(sql);
       res.send(result[0]);
    } catch(err) {
        res.status(500).send(err);
        console.log(err);
    }
}

exports.getApproveFacultyDetail = async(req,res) => {
    const id = req.params.id;
    try {
        const result = await db.execute(`select * from faculty join department on faculty.dept_id=department.dept_id where faculty_id='${id}'`);
        res.status(200).send(result[0]);
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.postApproveFaculty = async(req,res) => {
    const id = req.params.id;
    try {
       const result = await db.execute(`update faculty set status='approved' where faculty_id='${id}'`);
        res.status(200).send({success:true,data:result});
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.postRejectFaculty = async(req,res) => {
    const id = req.params.id;
    try {
        const result = await db.execute(`delete from faculty where faculty_id='${id}'`);
        res.status(200).send({success:true,data:result[0]});
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}