const db = require('../db');

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
    const timeTable = req.body.timeTable;
    let regno;
    if(req.userId) {
      regno = req.userId;
    } else {
      regno = req.body.regno;
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
      const result = await db.execute(`select first_name,last_name,dept_name,course_name,semester,image_url from student join course on student.course_id=course.course_id join department on course.dept_id=department.dept_id where regno='${regno}'`);
      const {first_name,last_name,dept_name,course_name,semester,image_url} = result[0];
      const filePath = path.join(__dirname,'hallticket.pdf');
      const start = Date.now();
      pdf.create(hallTicketTemplate( {first_name,last_name,dept_name,course_name,semester,image_url}),options).toStream((err,stream) => {
          res.setHeader('Content-type','application/pdf');
          res.setHeader('Content-Disposition','inline;filename="hallticket.pdf"');
          if(!err) {
              stream.pipe(res);
              const stop = Date.now();
              console.log(`Time Taken to execute = ${(stop - start)/1000} seconds`);
          } else {
              res.send('Something went wrong');
          }
      })
  
    } catch(err) {
  
    }
    
  }