const db = require('../db');
const {validationResult} = require('express-validator');

exports.postNewCourse = async(req,res) => {
    const {duration,name,semesters} = req.body;
    const err = validationResult(req).errors;
    if(err.length>0) {
        return res.status(400).send(err);
    }
    const totalSemesters = semesters.length;
        const checkCourse = await db.execute(`select course_name from course where course_name='${name}'`);
        if(checkCourse[0].length>0) {
           return res.status(403).send('course Already exists');
        }
        const courseSql = 'insert into course(dept_id,course_name,course_duration,course_sem) values(?,?,?,?)';
        db.execute(courseSql,[1,name,duration,totalSemesters])
        .then(() => {
            semesters.forEach(sem => {
                sem.subjects.forEach(sub => {
                    const semSql = `insert into semester(dept_id,course_name,sem_name,subj_name,subj_code) values(?,?,?,?,?)`;
                   return db.execute(semSql,[1,name,sem.semName,sub.name,sub.code])
                })
            })
        })
        .then((result) => {
            res.status(200).send({success:true,result})
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({success:false,err});
        })
    }