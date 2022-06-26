const db = require('../db');
const Pdfmake = require('pdfmake');
const fs = require('fs');
const path = require('path');
const hallTicketTemplate = require('../hallticket');

exports.getStudentApproveList = async(req,res) => {
    const {courseName} = req.body;
    const deptId = req.deptId;
    try {
        let sql;
        if(!courseName) {
            sql = `select regno,first_name,last_name,course_name,joining_year,image_path from student join course on student.course_id=course.course_id where student.dept_id=${deptId} and student.status='pending' order by regno`;
        } else {
            sql = `select regno,first_name,last_name,course_name,joining_year,image_path from student join course on student.course_id=course.course_id where student.dept_id=${deptId} and course.course_name='${courseName}' and student.status='pending'`;
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
    const imgUrl = req.body.imageUrl;
    const imagePath = path.join(__dirname,'..','uploads',imgUrl);
    try {
        const result = await db.execute(`delete from student where regno='${id}'`);
        fs.unlink(imagePath,(err => {
            if(err) {
                console.log(err);
                throw new Error('Something went wrong');
            }
            res.status(200).send({success:true,data:result[0]});
        }));
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

exports.generateBulkHallticket = async(req,res) => {
    const {semester,courseName} = req.body;

    try {
        const start = Date.now();
        const sql = `select regno,first_name,last_name,dept_name,semester,image_path from student join department on student.dept_id=department.dept_id where student.course_id=(select course_id from course where course_name='${courseName}') and student.semester=${semester} and eligibility=1 order by regno`;
        const [result] = await db.execute(sql);

        const timetableSql = `select subj_name,subj_code,exam_date,exam_time from timetable where course_id=(select course_id from course where course_name='${courseName}') and semester='${semester}' and status='approved' order by exam_date`;
        const [timetable] = await db.execute(timetableSql);

        const fonts = {
          Times: {
              normal: path.join(__dirname,'..','fonts','Times-New-Roman','times-new-roman.ttf'),
              bold: path.join(__dirname,'..','fonts','Times-New-Roman','times-new-roman-bold.ttf'),
              italics: path.join(__dirname,'..','fonts','Times-New-Roman','times-new-roman-italic.ttf'),
              bolditalics: path.join(__dirname,'..','fonts','Times-New-Roman','times-new-roman-bold-italic.ttf'),
            },
        }
        const pdf = new Pdfmake(fonts);
        const doc = pdf.createPdfKitDocument(hallTicketTemplate(result,timetable,courseName),{});
        doc.pipe(res);
        doc.end();
        const end = Date.now();
        const total = end-start;
        console.log(total+'ms');
    } catch(err) {
        console.log(err);
    }
}

exports.setStudentEligibility = async(req,res) => {
    const {regno, eligibility} = req.body;
    try {
        const sql = `update student set eligibility=${eligibility} where regno='${regno}'`;
        const result = await db.execute(sql);
        res.status(200).send({success:true,data:result[0]});
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.getPendingPayments = async(req,res) => {
    const deptId = req.deptId;
    const type = req.params.type;
    try {
        const result = await db.execute(`select payment.id,first_name,last_name,payment.regno,payment.semester,course_name,payment_id,reciept_path from payment join student on payment.regno=student.regno join course on student.course_id=course.course_id where payment.dept_id=${deptId} and exam_status='${type}' and payment.status='pending'`);
        res.status(200).send(result[0]);
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.getPayments = async(req,res) => {
    const deptId = req.deptId;
    const type = req.params.type;
    try {
        const result = await db.execute(`select payment.id,first_name,last_name,payment.regno,payment.semester,course_name,payment.status,payment_id,reciept_path from payment join student on payment.regno=student.regno join course on student.course_id=course.course_id where payment.dept_id=${deptId} and exam_status='${type}' and payment.status='approved'`);
        res.status(200).send(result[0]);
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.postPaymentApproval = async(req,res) => {
    const deptId = req.deptId;
    const approvalType = req.params.approvalType;
    const pId = req.body.pId;
    const reciept = req.body.reciept;
    try {
        let sql;
        if(approvalType==='approve') {
            sql = `update payment set status='approved' where dept_id=${deptId} and id=${pId}`;
            const result = await db.execute(sql);
            res.status(200).send(result[0]);
        } else {
            sql = `delete from payment where dept_id=${deptId} and id=${pId}`;
            const recieptPath = path.join(__dirname,'..','uploads',reciept);
            fs.unlink(recieptPath,(async(err) => {
                if(err) {
                    throw new Error('Something went wrong');
                } else {
                    const result = await db.execute(sql);
                    res.status(200).send(result[0]);
                }
            }))
        }
    } catch(err) {
        console.log(err);
        res.status(500).send({success:false})
    }
}

exports.getPaymentDetails = async(req,res) => {
    const paymentId = req.params.paymentId;
    const deptId = req.deptId;
    try{
        const result = await db.execute(`select regno,bank_name,acc_no,transaction_id,date_format(dop,'%d %b %Y') dop,reciept_path from payment where dept_id=${deptId} and payment_id='${paymentId}'`);
        res.send(result[0]);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.getSubjectDetails = async(req,res) => {
    const paymentId = req.params.paymentId;
    const deptId = req.deptId;
    try{
        const result = await db.execute(`select id,subj_name,subj_code from repeater_subjects where dept_id=${deptId} and payment_id='${paymentId}'`);
        res.send(result[0]);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.getPaymentReciept = async(req,res) => {
    const reciept = req.body.recieptPath;
    const recieptPath = path.join(__dirname,'..','uploads',reciept);
    res.download(recieptPath);
}

exports.getCurrentSubjects = async(req,res) => {
    const facultyId = req.params.facultyId;
    const deptId = req.deptId;
    try{
        const result = await db.execute(`select id,course_name,semester,subj_name,subj_code from faculty_subjects join course on faculty_subjects.course_id=course.course_id where faculty_subjects.dept_id=${deptId} and faculty_id='${facultyId}'`);
        res.send(result[0]);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.PostFacultySubjects = (req,res) => {
    const deptId = req.deptId;
    const {subjects,facultyId} = req.body;

         db.execute(`delete from faculty_subjects where dept_id=${deptId} and faculty_id='${facultyId}'`)
        .then(async() => {
            const sql = `insert into faculty_subjects(dept_id,course_id,faculty_id,semester,subj_name,subj_code) values(?,(select course_id from course where course_name=?),?,?,?,?)`;
            subjects.forEach(async(sub) => {
                return await db.execute(sql,[deptId,sub.courseName,facultyId,sub.semester,sub.subj_name,sub.subj_code])
            })
        })
        .then(result => {
            res.send(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).send(err);
        })
        
}

exports.getFacultySubject = async(req,res) => {
    const {courseName,semester} = req.body;
    const deptId = req.deptId;
    try{
        if(courseName&&semester) {
        const result = await db.execute(`select sem_id,subj_name,subj_code from semester where dept_id=${deptId} and course_id=(select course_id from course where course_name='${courseName}') and sem_name=${semester}`);
        res.send(result[0]);
        } else {
            res.send([]);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}
