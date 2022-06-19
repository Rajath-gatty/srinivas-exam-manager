const db = require('../db');
const pdf = require('html-pdf');
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
  
    const options = {
      "border": {
          "top": "1in",      
          "right": "1cm",
          "bottom": "1cm",
          "left": "1cm"
        },
        "format":"A4"
  }
  
    try {
      const [result] = await db.execute(`select regno,first_name,last_name,dept_name,course_name,semester,image_path from student join course on student.course_id=course.course_id join department on course.dept_id=department.dept_id where student.dept_id=${deptId} and regno='${stdId}'`);
      const {regno,first_name,last_name,dept_name,course_name,semester,image_path} = result[0];

      const start = Date.now();
      console.log(timetable);
      pdf.create(hallTicketTemplate({regno,first_name,last_name,dept_name,course_name,semester,image_path,timetable}),options).toBuffer((err,data) => {
          res.setHeader('Content-type','application/pdf');
          res.setHeader('Content-Disposition',`inline;filename="${regno}-hallticket.pdf"`);
          // const writePath = path.join(__dirname,'..','uploads')
          // const writeStream = fs.createWriteStream(writePath+'.pdf');
          // stream.pipe(writeStream);
          if(!err) {
              // stream.pipe(res);
              console.log(data);
              res.send(data);
              const stop = Date.now();
              console.log(`Time Taken to execute = ${(stop - start)/1000} seconds`);
          } else {
              res.send('Something went wrong');
          }
      })
    } catch(err) {
      // res.sendStatus(400).send(err);
      console.log(err);
    }
  }