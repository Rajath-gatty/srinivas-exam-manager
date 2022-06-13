const { validationResult } = require("express-validator");
const db = require("../db");
const bcrypt = require("bcrypt");

exports.postStudent = async (req, res) => {
  const data = req.body;
  const err = validationResult(req).errors;
  if (err.length > 0) {
    return res.status(400).send({ success: false, err });
  }
  try {
    const hashedPassword = await bcrypt.hash(data.password, 4);

    const result = await db.execute(
      "insert into student(regno,first_name,last_name,gender,dob,email,phone,address,blood_group,caste,aadhar_no,religion,birth_place,birth_district,country,identity_mark,pincode,password,f_name,f_occupation,f_phone,f_email,m_name,m_occupation,m_phone,m_email,g_name,g_occupation,g_phone,g_email,dept_id,course_id,joining_year,role,status,semester,eligibility) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,(select dept_id from department where dept_name=?),(select course_id from course where course_name=?),?,?,?,?,?)",
      [
        data.regno,
        data.firstName,
        data.lastName,
        data.gender,
        data.dob,
        data.email,
        data.phone,
        data.address,
        data.bloodGroup,
        data.caste,
        data.aadharNo,
        data.religion,
        data.birthPlace,
        data.birthDistrict,
        data.country,
        data.identityMark,
        data.pincode,
        hashedPassword,
        data.fatherName,
        data.fatherOccupation,
        data.fatherPhone,
        data.fatherEmail,
        data.motherName,
        data.motherOccupation,
        data.motherPhone,
        data.motherEmail,
        data.gName,
        data.gOccupation,
        data.gPhone,
        data.gEmail,
        data.department,
        data.course,
        data.joiningYear,
        "student",
        "pending",
        1,
        false
      ]
    );

    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.postFaculty = async (req, res) => {
  const data = req.body;
  const err = validationResult(req).errors;
  if (err.length > 0) {
    return res.status(400).send({ success: false, err });
  }
  const hashedPassword = await bcrypt.hash(data.password, 4);

  try {
    const result = await db.execute(
      "insert into faculty(faculty_id,first_name,last_name,gender,dob,email,phone,address,blood_group,caste,aadhar_no,religion,birth_place,birth_district,country,identity_mark,pincode,password,f_name,f_occupation,f_phone,f_email,dept_id,teaching_exp,joining_year,role,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,(select dept_id from department where dept_name=?),?,?,?,?)",
      [
        data.facultyId,
        data.firstName,
        data.lastName,
        data.gender,
        data.dob,
        data.email,
        data.phone,
        data.address,
        data.bloodGroup,
        data.caste,
        data.aadharNo,
        data.religion,
        data.birthPlace,
        data.birthDistrict,
        data.country,
        data.identityMark,
        data.pincode,
        hashedPassword,
        data.fatherName,
        data.fatherOccupation,
        data.fatherPhone,
        data.fatherEmail,
        data.department,
        data.teachingExp,
        data.joiningYear,
        "faculty",
        "pending",
      ]
    );
    res.status(200).send({ success: true, data: result[0] });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, err });
  }
};

exports.postStaff = async (req, res) => {
  const data = req.body;
  const err = validationResult(req).errors;
  if (err.length > 0) {
    return res.status(400).send({ success: false, err });
  }
  const hashedPassword = await bcrypt.hash(data.password, 4);

  try {
    const result = await db.execute(
      "insert into staff(first_name,last_name,gender,dob,email,phone,address,country,pincode,blood_group,caste,aadhar_no,identity_mark,religion,birth_place,birth_district,password,f_name,f_occupation,f_phone,f_email,joining_year,dept_id,role,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,(select dept_id from department where dept_name=?),?,?)",
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.dob,
        data.email,
        data.phone,
        data.address,
        data.country,
        data.pincode,
        data.bloodGroup,
        data.caste,
        data.aadharNo,
        data.identityMark,
        data.religion,
        data.birthPlace,
        data.birthDistrict,
        hashedPassword,
        data.fatherName,
        data.fatherOccupation,
        data.fatherPhone,
        data.fatherEmail,
        data.joiningYear,
        data.department,
        "staff",
        "pending",
      ]
    );
    res.status(200).send({ success: true, data: result[0] });
  } catch (err) {
    res.status(500).send({ success: false, err});
  }
};

