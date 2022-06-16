const db = require('../db');

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

exports.getAllStudent = async (req,res) => {
  let sql;
    sql=`select regno, first_name, last_name, course_id, joining_year, semester, eligibility from student`;
  
  try{
    const result = await db.execute(sql);
    res.send(result[0]);
  }catch(err){
    res.status(500).send(err);
  }
}

exports.getFilteredStudent = async (req,res) => {
  const deptId = req.deptId;
  let sql=`select regno, first_name, last_name, course_id, joining_year, semester, eligibility from student where dept_id=${deptId}`;
  
  try{
    const result = await db.execute(sql);
    res.send(result[0]);
  }catch(err){
    res.status(500).send(err);
  }
}


exports.getAllFaculty = (req,res) => {
  // const deptId = req.deptId;
}
exports.getAllStaff = (req,res) => {
}
exports.getAllExamCoord = (req,res) => {
}