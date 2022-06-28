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
