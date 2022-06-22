const db = require('../db');
const Pdfmake = require("pdfmake");
const hallTicketTemplate = require('../hallticket');
const fs = require('fs');
const path = require('path');

exports.getStudentTimetable = async(req,res) => {
    const {semester} = req.body;
    const deptId = req.deptId;
    const courseId = req.body.courseId;

    try{
        let sql = `select subj_code,subj_name,exam_date,exam_time from timetable where dept_id=${deptId} and course_id=${courseId} and semester=${semester} and status='approved'`;
       const result = await db.execute(sql);
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
      const [result] = await db.execute(`select regno,first_name,last_name,dept_name,course_name,semester,image_path from student join course on student.course_id=course.course_id join department on course.dept_id=department.dept_id where student.dept_id=${deptId} and regno='${stdId}'`);

      const pdf = new Pdfmake(fonts);
      fs.readFile(`./pdfs/${stdId}.pdf`, 'utf8', (err, data) => {
        if (!err) {
          res.download(`./pdfs/${stdId}.pdf`);
        } else {
          const doc = pdf.createPdfKitDocument(hallTicketTemplate(result,timetable),{});
          // const writeStream = fs.createWriteStream(`./pdfs/${regno}.pdf`);
          // doc.pipe(writeStream);
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