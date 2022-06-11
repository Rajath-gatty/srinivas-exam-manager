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
      const result = await db.execute(`select course_name,course_id from course where dept_id=(select dept_id from department where dept_name='${departmentName}')`);
      res.send(result[0]);
    } catch(err) {
        res.status(500).send(err);
    }
}