const db = require('../db');
const hallTicketTemplate = require('../hallticket');

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
  try {
    const [result] = await db.execute(`select course_sem from course where course_name='${courseName}'`);
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
    sql=`select regno, first_name, last_name, course_name, joining_year, semester, eligibility from student join course on student.course_id=course.course_id where student.dept_id = ${deptId} and course_name='${courseName}' and semester=${semester} and student.status='approved'`;
  } else if(courseName) {
    sql=`select regno, first_name, last_name, course_name, joining_year, semester, eligibility from student join course on student.course_id=course.course_id where student.dept_id = ${deptId} and course_name='${courseName}' and student.status='approved'`;
  } else {
    sql=`select regno, first_name, last_name, course_name, joining_year, semester, eligibility from student join course on student.course_id=course.course_id where student.dept_id = ${deptId} and status='approved'`;
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
   let sql=`select faculty_id,email,first_name, last_name,joining_year from faculty where faculty.dept_id=${deptId} and status='approved'`;
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

  let sql=`select course_name,eligibility,first_name,last_name,joining_year,regno,semester from student join course on student.course_id=course.course_id where student.course_id=(select course_id from course where course_name='${courseName}') and student.semester=${semester}`;
  try{
    const result = await db.execute(sql);
    res.send(result[0]);
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}