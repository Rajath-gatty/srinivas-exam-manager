const {validationResult} = require('express-validator');
const db = require('../db');

exports.postStudent = async(req, res) => {
    const data = req.body;
    const err = validationResult(req).errors;
    if(err.length>0) {
       return res.status(400).send({success:false,err});
    }
    const result = await db.execute('insert into student(regno,first_name,gender,dob,email,phone,address,blood_group,caste,aadhar_no,religion,birth_place,birth_district,country,pincode,password,f_name,f_occupation,f_phone,f_email,m_name,m_occupation,m_phone,m_email,department,course,joining_year) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [data.regNo,data.firstName,data.gender,data.dob,data.email,data.phone,data.address,data.bloodGroup,data.caste,data.aadharNo,data.religion,data.birthPlace,data.birthDistrict,data.country,data.pincode,data.password,data.fatherName,data.fatherOccupation,data.fatherPhone,data.fatherEmail,data.motherName,data.motherOccupation,data.motherPhone,data.motherEmail,data.department,data.course,data.joiningYear]);

    console.table(result[0]);
    res.status(200).send({success:true,data});
}

exports.postFaculty = (req, res) => {
    const data = req.body;
    const err = validationResult(req).errors;
    if(err.length>0) {
       return res.status(400).send({success:false,err});
    }
    res.status(200).send({success:true,data});
}

exports.postStaff = (req, res) => {
    const data = req.body;
    const err = validationResult(req).errors;
    if(err.length>0) {
       return res.status(400).send({success:false,err});
    }
    res.status(200).send({success:true,data});
}
