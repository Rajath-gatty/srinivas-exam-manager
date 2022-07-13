const db = require('../db');
const jwt = require('jsonwebtoken');
const emailTemplate = require('../emailTemplate');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

exports.getDepartments = async(req,res) => { 
    try {
      const result = await db.execute('select dept_id,dept_name from department');
      res.send(result[0]);
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.getCourses = async(req,res) => {
    try {
      const departmentName = req.body.departmentName;
      const deptId = req.body.deptId;

      let sql;
      if(departmentName) {
        sql = `select course_name,course_id from course where dept_id=(select dept_id from department where dept_name='${departmentName}')`;
      } else {
        sql = `select course_name,course_id from course where dept_id=${deptId}`;
      }
      const result = await db.execute(sql);
      res.send(result[0]);
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.getSemesters = async(req,res) => {
  const courseName = req.body.courseName;
  const courseId = req.body.courseId;

  try {
    let sql;
    if(courseName) {
      sql = `select course_sem from course where course_name='${courseName}'`;
    } else {
      sql = `select course_sem from course where course_id=${courseId}`;
    }
    const [result] = await db.execute(sql);
    res.send(result[0]);
  } catch(err) {
      res.status(500).send(err);
  }
}

exports.getAllStudent = async (req,res) => {
  const deptId = req.deptId;
  const courseName = req.body.courseValue;
  const semester = req.body.semester;
  let sql;
  if(courseName&&semester) {
    sql=`select regno, first_name, last_name, course_name, joining_year, semester, eligibility from student join course on student.course_id=course.course_id where student.dept_id = ${deptId} and course_name='${courseName}' and semester=${semester} and student.status='approved' order by regno`;
  } else if(courseName) {
    sql=`select regno, first_name, last_name, course_name, joining_year, semester, eligibility from student join course on student.course_id=course.course_id where student.dept_id = ${deptId} and course_name='${courseName}' and student.status='approved' order by regno`;
  } else {
    sql=`select regno, first_name, last_name, course_name, joining_year, semester, eligibility from student join course on student.course_id=course.course_id where student.dept_id = ${deptId} and status='approved' order by regno`;
  }
  try{
    const result = await db.execute(sql);
    res.send(result[0]);
  }catch(err){
    res.status(500).send(err);
  }
}

exports.getAllFaculty = async(req,res) => {
  const deptId = req.deptId;
   let sql=`select faculty_id,email,first_name, last_name,joining_year from faculty where faculty.dept_id=${deptId} and status='approved' order by faculty_id`;
  try{
    const result = await db.execute(sql);
    res.send(result[0]);
  }catch(err){
    console.log(err)
    res.status(500).send(err);
  }
}

exports.getAllStaff = async(req,res) => {
  const deptId = req.deptId;
  let sql=`select staff_id, first_name, last_name, email, joining_year from staff where staff.dept_id=${deptId} and status='approved'`;
  try{
    const result = await db.execute(sql);
    res.send(result[0]);
  }catch(err){
    res.status(500).send(err);
  }
}

exports.getAllExamCoord = async(req,res) => {
  const deptId = req.deptId;
  let sql=`select coord_id, first_name, last_name, email,dept_name from exam_coord join department on exam_coord.dept_id=department.dept_id where exam_coord.dept_id=${deptId}`;
  try{
    const result = await db.execute(sql);
    res.send(result[0]);
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}

exports.getUserDetails = async(req,res) => {
  let type = req.body.type;
  const userId = req.body.uid;
  const idName = req.body.idName;
  if(type==="examcoordinator") type = "exam_coord";

  let sql=`select * from ${type} where ${idName}='${userId}'`;
  try{
    const result = await db.execute(sql);
    res.send(result[0]);
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}

exports.getSemFilteredStudent = async(req,res) => {
  const semester = req.body.semester;
  const courseName = req.body.courseName;

  let sql=`select course_name,eligibility,first_name,last_name,joining_year,regno,image_path,semester from student join course on student.course_id=course.course_id where student.course_id=(select course_id from course where course_name='${courseName}') and student.semester=${semester}`;
  try{
    const result = await db.execute(sql);
    res.send(result[0]);
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}

exports.getStudentByID = async(req,res) => {
  const {query} = req.body;
  const deptId = req.deptId;

  let sql=`select course_name,eligibility,first_name,last_name,regno,joining_year,semester from student join course on student.course_id=course.course_id where student.dept_id=${deptId} and student.regno LIKE '${query}%'`;
  try{
    const result = await db.execute(sql);
    res.send(result[0]);
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
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
  try {
      const sql = `insert ignore into faculty_subjects(dept_id,course_id,faculty_id,semester,subj_name,subj_code) values(?,(select course_id from course where course_name=?),?,?,?,?)`;
      subjects.forEach(async(sub) => {
          await db.execute(sql,[deptId,sub.course_name,facultyId,sub.semester,sub.subj_name,sub.subj_code])
      })
      res.send('Inserted!')
  } catch(err) {
      console.log(err);
  } 
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

exports.removeFacultySubjects = async(req,res) => {
  const deptId = req.deptId;
  const {data,facultyId} = req.body;

  try {
     let sql = `delete from faculty_subjects where dept_id=${deptId} and faculty_id='${facultyId}' and subj_code='${data.subj_code}'`;
      await db.execute(sql);
     res.send('success');
  } catch(err) {
      console.log(err);
  }
}

exports.postForgotPassword = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { email,role } = req.body;
  const re =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!re.test(email)) {
      return res.status(422).json({ error: "Invalid email" });
  }
  let tableName;
  let columnId;
  if(role==='admin') {
    tableName='admin';
    columnId='admin_id';
  } else if(role==='super admin'){
    tableName='super_admin';
    columnId='s_admin_id';
  } else if(role==='exam coord') {
    tableName='exam_coord';
    columnId='coord_id';
  } else if(role==='student') {
    tableName='student';
    columnId='regno';
  } else if(role==='faculty') {
    tableName='faculty';
    columnId='faculty_id';
  } else if(role==='staff') {
    tableName='staff';
    columnId='staff_id';
  }
  try {
      const [user] = await db.execute(`select role,${columnId},dept_id from ${tableName} where email='${email}'`);
      if (!user.length>0) {
          return res
              .status(422)
              .json({ error: "No user found with this email" });
      }
      const fetchedUser = user[0];
      const deptId = fetchedUser.dept_id;
      console.log(deptId);
      const key = jwt.sign({ role:tableName,deptId:deptId,columnId,id:fetchedUser[columnId] }, process.env.SECRET_KEY, {
          expiresIn: "10min",
      });
      const url = `${process.env.CLIENT_URL}/reset-password/${key}`;

      const msg = {
        to: email,
        from: `Srinivas Exam Manager <rajathgatty001@gmail.com>`,
        subject: "password reset",
        text: "and easy to do anywhere, even with Node.js",
        html: emailTemplate(email,url)
      }
      // console.log(url);
      sgMail.send(msg)
      .then(result => {
        res.send(result);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
          res.status(500).json({ error: "Email not sent" });
      });
  } catch (err) {
      return res.status(401).json({ error: err.message });
  }
}
 
exports.postResetPassword = async (req, res) => {
  const { password,token } = req.body;
  try {
      const result = jwt.verify(token, process.env.SECRET_KEY);
      console.log(result);
      const [user] = await db.execute(`select password,${result.columnId},dept_id from ${result.role} where ${result.columnId}=? and dept_id=${result.deptId}`,[result.id]);
      console.log(user);
      const hashedPassword = await bcrypt.hash(password, 5);
      const finalResult = await db.execute(`update ${result.role} set password='${hashedPassword}' where dept_id=${result.deptId} and ${result.columnId}=?`,[result.id]);
      console.log(finalResult);
      res.json({ sucess: true });
  } catch (err) {
      res.status(500).json({ error: 'Link Expired!' });
  }
};