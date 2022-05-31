const {validationResult} = require('express-validator');
const db = require('../db');
const bcrypt = require('bcrypt');

exports.postStudent = async(req, res) => {
    const data = req.body;
    const err = validationResult(req).errors;
    if(err.length>0) {
       return res.status(400).send({success:false,err});
    }
    try {
        const hashedPassword = await bcrypt.hash(data.password,4);

        const result = await db.execute('insert into student(regno,first_name,gender,dob,email,phone,address,blood_group,caste,aadhar_no,religion,birth_place,birth_district,country,pincode,password,f_name,f_occupation,f_phone,f_email,m_name,m_occupation,m_phone,m_email,department,course,joining_year,role,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [data.regNo,data.firstName,data.gender,data.dob,data.email,data.phone,data.address,data.bloodGroup,data.caste,data.aadharNo,data.religion,data.birthPlace,data.birthDistrict,data.country,data.pincode,hashedPassword,data.fatherName,data.fatherOccupation,data.fatherPhone,data.fatherEmail,data.motherName,data.motherOccupation,data.motherPhone,data.motherEmail,data.department,data.course,data.joiningYear,'student','pending']);
    
        console.table(result[0]);
        res.status(200).send({success:true,data});
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.postFaculty = async(req, res) => {
    const data = req.body;
    const err = validationResult(req).errors;
    if(err.length>0) {
       return res.status(400).send({success:false,err});
    }
    const hashedPassword = await bcrypt.hash(data.password,4);

    const result = await db.execute('insert into faculty(faculty_id,first_name,gender,dob,email,phone,address,blood_group,caste,aadhar_no,religion,birth_place,birth_district,country,pincode,password,f_name,f_occupation,f_phone,f_email,department,joining_year,role,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [data.facultyId,data.firstName,data.gender,data.dob,data.email,data.phone,data.address,data.bloodGroup,data.caste,data.aadharNo,data.religion,data.birthPlace,data.birthDistrict,data.country,data.pincode,hashedPassword,data.fatherName,data.fatherOccupation,data.fatherPhone,data.fatherEmail,data.department,data.joiningYear,'faculty','pending']);
    res.status(200).send({success:true,data:result[0]});
}

exports.postStaff = async(req, res) => {
    const data = req.body;
    const err = validationResult(req).errors;
    if(err.length>0) {
       return res.status(400).send({success:false,err});
    }
    const hashedPassword = await bcrypt.hash(data.password,4);

    const result = await db.execute('insert into staff(first_name,gender,dob,email,phone,address,blood_group,caste,aadhar_no,religion,password,role,status) values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    [data.firstName,data.gender,data.dob,data.email,data.phone,data.address,data.bloodGroup,data.caste,data.aadharNo,data.religion,hashedPassword,'staff','pending']);
    res.status(200).send({success:true,data:result[0]});
}

exports.getStudents = async(req,res) => {
    const result = await db.execute('select first_name,g_name,joining_year,pincode from student');
    res.status(200).send({success:true,data:result[0]});
}
