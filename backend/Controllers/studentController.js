const db = require('../db');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const zlib = require('zlib');
const { Worker } = require('worker_threads');

exports.getStudentSubjects = async(req,res) => {
  const {semester,courseId} = req.body;
  try {
    if(courseId&&semester) {
      const sql = `select sem_id,subj_name,subj_code from semester where course_id=? and sem_name=?`;
      const result = await db.execute(sql,[courseId,semester]);
      res.status(200).send(result[0]);
    } else {
      res.send([]);
    }
  } catch(err) {
    console.log(err);
    res.status(500).send(err);
  }
}

exports.postRegularPayment = async(req,res) => {
  const file = req.file;
  const deptId = req.deptId;
  const {bank,accno,transaction,date,semester,courseId,studentId,paymentId} = req.body;
  const recieptPath = `/reciepts/${file.filename}`;

  const err = validationResult(req).errors;
  if (err.length > 0) {
    res.status(400).send({ success: false, err });
    fs.unlink(file.path,(err)=>err&&res.status(500).send('Something went wrong'));
    return;
  }
try {
    const sql = `insert into payment(dept_id,course_id,payment_id,regno,semester,bank_name,dop,transaction_id,acc_no,reciept_path,exam_status,status) values(?,?,?,?,?,?,?,?,?,?,?,?)`;

    const result = db.execute(sql,[deptId,courseId,paymentId,studentId,semester,bank,date,transaction,accno,recieptPath,'regular','pending']);
    res.send(result[0]);
  } catch(err) {
    console.log(err)
  }
}

exports.postRepeaterPayment = async(req,res) => {
  const file = req.file;
  const deptId = req.deptId;
  const {bank,accno,transaction,date,semester,courseId,studentId,paymentId} = req.body;
  const recieptPath = `/reciepts/${file.filename}`;
  const repeaterSubjects = JSON.parse(req.body.repeaterSubjects);

  const err = validationResult(req).errors;
  if (err.length > 0) {
    res.status(400).send({ success: false, err });
    fs.unlink(file.path,(err)=>err&&res.status(500).send('Something went wrong'));
    return;
  }

  try {
    const sql = `insert into payment(dept_id,course_id,payment_id,regno,semester,bank_name,dop,transaction_id,acc_no,reciept_path,exam_status,status) values(?,?,?,?,?,?,?,?,?,?,?,?)`;

    const sql2 = `insert into repeater_subjects(dept_id,payment_id,subj_name,subj_code) values(?,?,?,?)`;

    db.execute(sql,[deptId,courseId,paymentId,studentId,semester,bank,date,transaction,accno,recieptPath,'repeater','pending'])
    .then(() => {
      repeaterSubjects.forEach(sub => {
       return db.execute(sql2,[deptId,paymentId,sub.subj_name,sub.subj_code])
      })
    })
    .then(result => {
      res.send(result);
    })
  } catch(err) {
    res.status(500).send(err);
    console.log(err)
  }
}

exports.getStudentTimetable = async(req,res) => {
    const {classId} = req.body;
    const deptId = req.deptId;

    try{
        let sql = `select subj_code,subj_name,exam_date,exam_time from timetable where dept_id=? and class_id=? and status='approved'`;
       const result = await db.execute(sql,[deptId,classId]);
       res.send(result[0]);
    } catch(err) {
        res.status(500).send(err);
        console.log(err);
    }
}

exports.generateHallTicket = async(req,res) => {
    const stdId = req.userId;
    const worker = new Worker(path.join(__dirname,'..','hallticketWorker.js'),{workerData:{
      staff:false,
      body:req.body,
      regno:stdId
  }});

  worker.on('message',data => {
      res.set('content-encoding','gzip');
      zlib.gzip(data,{level:6},(err,zip)=>{
          res.send(zip);
      })
  })
  worker.on('error',(err)=> {
      console.log(err);
  })
  worker.on('exit',()=>console.log(`process exited on thread ${worker.threadId}`))
  }

  exports.getStudentInternalMarks = async(req,res) => {
    const deptId = req.deptId;
    const {semester,courseId,regno} = req.body;
    try {
      const result = await db.execute(`select id,subj_name,subj_code,marks,attendence from marks_attendence where course_id=${courseId} and semester=${semester} and regno='${regno}'`);
      res.send(result[0]);
    } catch(err) {
      res.send(err);
      console.log(err);
    }
  }