const db = require('../db');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { Worker } = require('worker_threads');

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
    const worker = new Worker(path.join(__dirname,'..','hallticketWorker.js'),{workerData:{
        body:req.body,
        staff:true
    }});

    worker.on('message',data => {
        if(typeof data==='string') {
            return res.status(201).send(data);
        }
        res.set('content-encoding','gzip');
        zlib.gzip(data,{level:6},(err,zip)=>{
            res.send(zip);
        })
    })
    worker.on('error',(err)=> {
        res.send('No Timetable Found')
    })
    worker.on('exit',()=>console.log(`process exited on thread ${worker.threadId}`))
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