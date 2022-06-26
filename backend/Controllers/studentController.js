const db = require('../db');
const Pdfmake = require("pdfmake");
const hallTicketTemplate = require('../hallticket');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

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
    const {semester} = req.body;
    const deptId = req.deptId;
    const courseId = req.body.courseId;

    try{
        let sql = `select subj_code,subj_name,exam_date,exam_time from timetable where dept_id=? and course_id=? and semester=? and status='approved'`;
       const result = await db.execute(sql,[deptId,courseId,semester]);
       res.send(result[0]);
    } catch(err) {
        res.status(500).send(err);
        console.log(err);
    }
}

exports.generateHallTicket = async(req,res) => {
    const deptId = req.deptId;
    const timetable = req.body.timetable;
    let stdId;
    if(req.userId) {
      stdId = req.userId;
    } else {
      stdId = req.body.regno;
    }

    const fonts = {
      Times: {
          normal: path.join(__dirname,'..','fonts','Times-New-Roman','times-new-roman.ttf'),
          bold: path.join(__dirname,'..','fonts','Times-New-Roman','times-new-roman-bold.ttf'),
          italics: path.join(__dirname,'..','fonts','Times-New-Roman','times-new-roman-italic.ttf'),
          bolditalics: path.join(__dirname,'..','fonts','Times-New-Roman','times-new-roman-bold-italic.ttf'),
        },
    }
  ;
    try {
      const start = Date.now();
      const [result] = await db.execute(`select regno,first_name,last_name,dept_name,course_name,semester,image_path from student join course on student.course_id=course.course_id join department on course.dept_id=department.dept_id where student.dept_id=? and regno=? and eligibility=1`,[deptId,stdId]);

      const pdf = new Pdfmake(fonts);
      fs.readFile(`./pdfs/${stdId}.pdf`, 'utf8', (err, data) => {
        if (!err) {
          res.download(`./pdfs/${stdId}.pdf`);
        } else {
          const doc = pdf.createPdfKitDocument(hallTicketTemplate(result,timetable),{});
          doc.end();
          doc.pipe(res);
        }
      })
      const end = Date.now();
      console.log(end-start+'ms');
    } catch(err) {
      res.status(400).send(err);
      console.log(err);
    }
  }