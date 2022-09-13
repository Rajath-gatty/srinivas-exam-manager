const db = require('../db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.postNewCourse = async (req, res) => {
    const { duration, name, semesters, edit } = req.body;
    const totalSemesters = semesters.length;
    const deptId = req.deptId;
    const err = validationResult(req).errors;
    if (err.length > 0) {
        return res.status(400).send(err);
    }
    if(edit === true) {
      db.execute(`select course_id from course where course_name='${name}'`)
      .then(async([result]) => {
        const courseRes = `update course set course_sem=? where course_id=${result[0].course_id}`;
        await db.execute(courseRes,[totalSemesters])
        semesters.forEach(sem => {
            sem.subjects.forEach(sub => {
                const semSql = `insert ignore into semester(dept_id,course_id,sem_name,subj_name,subj_code,i_a,credits) values(?,?,?,?,?,?,?)`;
                return db.execute(semSql, [deptId, result[0].course_id, sem.semName, sub.name, sub.code,sub.ia,sub.credits])
            })
        })
    })
    .then(() => {
        res.send('Course subjects Updated!');
    })
    .catch((err) => res.status(500).send(err))
    } else {
    const checkCourse = await db.execute(`select course_name from course where course_name='${name}'`);
    if (checkCourse[0].length > 0) {
        return res.status(403).send('course Already exists');
    }
    const courseSql = 'insert into course(dept_id,course_name,course_duration,course_sem) values(?,?,?,?)';

    db.execute(courseSql, [deptId, name, duration, totalSemesters])
        .then(() => {
            return db.execute(`select course_id from course where course_name='${name}'`)
        })
        .then(([result]) => {
            semesters.forEach(sem => {
                sem.subjects.forEach(sub => {
                    const semSql = `insert into semester(dept_id,course_id,sem_name,subj_name,subj_code,i_a,credits) values(?,?,?,?,?,?,?)`;
                    return db.execute(semSql, [deptId, result[0].course_id, sem.semName, sub.name, sub.code,sub.ia,sub.credits])
                })
            })
        })
        .then((result) => {
            res.status(200).send('Course Added!')
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ success: false, err });
        })
    }
}

exports.removeCourseSubjects = async(req,res) => {
    const {subjects,courseId} = req.body;
    let totalSem = req.body.totalSem-1;
    console.log(totalSem,courseId);
    try {
    if(totalSem>=0) {
        const sql = `update course set course_sem=? where course_id=${courseId}`;
        const courseRes = await db.execute(sql,[totalSem]);
        console.log(courseRes);
    }
    const sql = `delete from semester where subj_code in (?)`;
    const result = await db.query(sql,[subjects]);
    // console.log(result);
    res.send('Success');
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.postNewDepartment = async (req, res) => {
    const { departmentName, firstName, lastName, dob, email, gender, address, phone, password } = req.body;
    const err = validationResult(req).errors;
    if (err.length > 0) {
        return res.status(400).send({ success: false, err });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 4);
        db.execute(`insert into department(dept_name) values(?)`, [departmentName])
            .then(() => {
                return db.execute(`select dept_id from department where dept_name='${departmentName}'`);
            })
            .then(([result]) => {
                const deptId = result[0].dept_id;
                const adminSql = `insert into admin(dept_id,first_name,last_name,gender,dob,email,address,phone,password) values(?,?,?,?,?,?,?,?,?)`;
                return db.execute(adminSql, [deptId, firstName, lastName, gender, dob, email, address, phone, hashedPassword])
            })
            .then(() => {
                res.send({ success: true, msg: 'Inserted Successfully' })
            })
            .catch(err => {
                // console.log(err);
                return res.status(500).send({ success: false, err });
            })
    } catch (err) {
        // console.log(err);
        return res.status(500).send({ success: false, err });
    }
}

exports.getDepartments = async (req, res) => {
    try {
        const result = await db.execute('select department.dept_id,dept_name,first_name from department JOIN admin ON department.dept_id=admin.dept_id');
        res.send(result[0]);
    } catch (err) {
        res.status(500).send({ success: false, err })
    }
}

exports.getCourses = async (req, res) => {
    const deptId = req.deptId;
    try {
        const result = await db.execute(`select course_id,course_name,course_sem,course_duration from course where dept_id=${deptId}`);
        res.set('Cache-Control','public, max-age=30').send(result[0]);
    } catch (err) {
        console.log(err);
        res.status(404).send({ success: false });
    }
}

exports.getCourseDetails = async (req, res) => {
    const deptId = req.deptId;
    try {
        const result = await db.execute(`select sem_id,sem_name,subj_code,subj_name,i_a,credits from semester where dept_id=${deptId} AND course_id=${req.body.courseId} order by sem_name`);
        res.send(result[0]);
    } catch (err) {
        console.log(err);
        res.status(404).send({ success: false });
    }
}

exports.fetchSubjects = async (req,res) => {
    const {className,courseName} = req.body;
    const deptId = req.deptId;
    try {
        const sql = `select sem_id,subj_name,subj_code from semester where dept_id=${deptId} and course_id=(select course_id from course where course_name='${courseName}') and sem_name=(select semester from classroom where name='${className}')`;
        const result = await db.execute(sql);
        res.send(result[0]);
    } catch (err) {
        console.log(err);
        res.status(404).send({ success: false });
    }
}

exports.postCodingSheet = async (req,res) => {
    const {classroomName,subjectName,studentDetails} = req.body;
    const deptId =  req.deptId;
    console.log(studentDetails);
    try {
        const [result] = await db.execute(`select class_id,course_id from classroom where name=?`,[classroomName]);
        studentDetails.forEach(async (std) => {
            await db.query('insert into coding_sheet(dept_id,course_id,class_id,regno,coding_sheet,subj_name) values(?,?,?,?,?,?)',[deptId,result[0].course_id,result[0].class_id,std.regno,std.coding,subjectName])
        })
    } catch(err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
    res.send('success');
}

exports.postNewCoordinator = async (req, res) => {
    const { departmentName, firstName, lastName, dob, email, gender, address, phone, password } = req.body;
    const err = validationResult(req).errors;
    if (err.length > 0) {
        return res.status(400).send({ success: false, err });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 4);
        db.execute(`select dept_id from department where dept_name='${departmentName}'`)
            .then(([result]) => {
                const deptId = result[0].dept_id;
                const coordSql = `insert into exam_coord(dept_id,first_name,last_name,gender,dob,email,address,phone,password) values(?,?,?,?,?,?,?,?,?)`;
                return db.execute(coordSql, [deptId, firstName, lastName, gender, dob, email, address, phone, hashedPassword])
            })
            .then(() => {
                res.send({ success: true, msg: 'Inserted Successfully' })
            })
            .catch(err => {
                // console.log(err);
                return res.status(500).send({ success: false, err });
            })
    } catch (err) {
        // console.log(err);
        return res.status(500).send({ success: false, err });
    }
}

exports.getExamCoordinators = async (req, res) => {
    try {
        const result = await db.execute('select dept_name,first_name,coord_id from exam_coord join department on exam_coord.dept_id=department.dept_id');
        res.send(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.getStaffApproveList = async (req, res) => {
    const deptId = req.deptId;
    try {
        const sql = `select staff_id,first_name,last_name,joining_year from staff where dept_id=${deptId} and status='pending'`;
        const result = await db.execute(sql);
        res.send(result[0]);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

exports.getApproveStaffDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.execute(`select * from staff join department on staff.dept_id=department.dept_id where staff_id='${id}'`);
        res.status(200).send(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false })
    }
}

exports.postApproveStaff = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.execute(`update staff set status='approved' where staff_id='${id}'`);
        res.status(200).send({ success: true, data: result });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false })
    }
}

exports.postRejectStaff = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.execute(`delete from staff where staff_id='${id}'`);
        res.status(200).send({ success: true, data: result[0] });
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false })
    }
}

exports.postNewTimeTable = async(req, res) => {
    const { courseName, semester, timetable, tId, classId } = req.body;
    const deptId = req.deptId;

    try {
        const duplicate = await db.execute(`select count(class_id) as count from timetable where class_id="${classId}"`)
        if(duplicate[0][0].count > 0){
            return res.status(400).send('Timetable already exists');
        }

        const sql = `insert into timetable(dept_id,course_id,semester,class_id,t_id,subj_name,subj_code,exam_date,exam_time,status) values(?,(select course_id from course where course_name=?),?,?,?,?,?,?,?,?)`;
        timetable.forEach(async ({ subjectName, subjectCode, examDate, examTime }) => {
            await db.execute(sql, [deptId, courseName, semester,classId, tId, subjectName, subjectCode, examDate, examTime, 'pending']);
        })
        res.status(200).send({ success: true, result: 'Inserted Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
    }
}

exports.deleteTimetable = async (req, res) => {
    const {id} = req.body;
    const sql = `delete from timetable where t_id='${id}'`;

    try {
        await db.query(sql);
        res.status(200).send({success: true, result: 'Deleted Successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
    }
}

exports.getTimetables = async (req, res) => {
    const deptId = req.deptId;
    const sql = `select name as class_name,course_name,t_id,timetable.semester,count(subj_name) as total_subjects,date_format(convert_tz(created_at,@@session.time_zone,'+05:30'),'%d %b-%Y %l:%i %p') created_at,status from timetable join course on timetable.course_id=course.course_id join classroom on timetable.class_id=classroom.class_id where timetable.dept_id=${deptId} group by t_id order by created_at desc;`;
    try {
        const result = await db.execute(sql);
        res.status(200).send(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false })
    }
}