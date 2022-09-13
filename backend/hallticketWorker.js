const {workerData,parentPort} = require('worker_threads');
const hallTicketTemplate = require('./hallticket');
const db = require('./db');
const Pdfmake = require('pdfmake');
const path = require('path');
const generateHallticket =  async(callback) => {
    try {
        const staff = workerData.staff;
        const {classId} = workerData.body;

        const start1 = Date.now();
        let sql,courseName,regno;

        if(staff) {
             courseName = workerData.body.courseName;

             sql = `select regno,first_name,last_name,dept_name,semester,image_path from student join department on student.dept_id=department.dept_id where class_id=${classId} and eligibility=1 order by regno`;
        } else {
            regno = workerData.regno;
            sql = `select regno,first_name,last_name,dept_name,course_name,semester,image_path from student join course on student.course_id=course.course_id join department on course.dept_id=department.dept_id where regno='${regno}' and eligibility=1`
        }
        const [result] = await db.execute(sql);    
        
        const timetableSql = `select subj_name,subj_code,exam_date,exam_time from timetable where class_id=${classId} and semester=${staff?workerData.body.semester:result[0].semester} and status='approved' `;
        const [timetable] = await db.execute(timetableSql);
        if(timetable.length<=0) {
            throw new Error('No timetable Found');
        }
        const end1 = Date.now();
        const total1 = end1-start1;
        console.log('query time ',total1+'ms');

        const start = Date.now();
        const fonts = {
          Times: {
              normal: path.join(__dirname,'fonts','Times-New-Roman','times-new-roman.ttf'),
              bold: path.join(__dirname,'fonts','Times-New-Roman','times-new-roman-bold.ttf'),
              italics: path.join(__dirname,'fonts','Times-New-Roman','times-new-roman-italic.ttf'),
              bolditalics: path.join(__dirname,'fonts','Times-New-Roman','times-new-roman-bold-italic.ttf'),
            },
        }
        const pdf = new Pdfmake(fonts);
        const doc = pdf.createPdfKitDocument(hallTicketTemplate(result,timetable,courseName),{});

        const chunks=[];
        doc.on('data', (chunk) =>{
            chunks.push(chunk);
        });

        doc.on('end', function () {
           const result2 = Buffer.concat(chunks);
            callback(result2);
        });

        doc.end();                  
        const end = Date.now();
        const total = end-start;
        console.log('Hallticket ',total+'ms');
        console.log('Total ',end-start1+'ms');
        } catch(err) {
            console.log(err);
        callback('No timetable Found')
        process.exit(0);
    }
}

generateHallticket(function (binary) {
        parentPort.postMessage(binary);
        process.exit(0);
});