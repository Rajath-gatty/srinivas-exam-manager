const { validationResult } = require("express-validator");
const {BlobServiceClient, StorageSharedKeyCredential} = require("@azure/storage-blob");
const sharp = require('sharp');
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const account=process.env.AZURE_ACCOUNT_NAME;
const accountKey=process.env.AZURE_API_KEY;
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
`https://${account}.blob.core.windows.net`, 
sharedKeyCredential
);
// const containerClient = blobServiceClient.getContainerClient('student-profiles');

exports.postStudent = async (req, res) => {
  const data = req.body;
  // const imagePath = `/studentProfiles/${req.file.filename}`; 

  try {
  const optImg = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
  const containerClient = blobServiceClient.getContainerClient('student-profiles');
  const uid = `${(Math.random() + 1).toString(36).substring(2)}.webp`;
  const blockBlobClient = containerClient.getBlockBlobClient(uid);
  await blockBlobClient.uploadData(optImg);
  const imagePath = `https://${account}.blob.core.windows.net/student-profiles/${uid}`;

  const hashedPassword = await bcrypt.hash(data.password, 4);

    const result = await db.execute(
      "insert into student(regno,first_name,last_name,gender,dob,email,phone,address,blood_group,caste,aadhar_no,religion,birth_place,birth_district,country,identity_mark,pincode,password,f_name,f_occupation,f_phone,f_email,m_name,m_occupation,m_phone,m_email,g_name,g_occupation,g_phone,g_email,dept_id,course_id,image_path,joining_year,role,status,semester,eligibility) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,(select dept_id from department where dept_name=?),(select course_id from course where course_name=?),?,?,?,?,?,?)",
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
        imagePath,
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
    res.status(500).send({ success: false, err });
  }
};

exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const loginType = req.body.role;
  try {
    let sql;
    let id;
    if (loginType === 'student') {
      id = "regno";
      sql = `select regno,first_name,last_name,email,password,phone,dept_id,semester,course_id,image_path,address,role,eligibility,class_id from ${loginType} where email='${email}' and status='approved'`;
    } else if (loginType === 'super admin') {
      id = 's_admin_id';
      sql = `select ${id},first_name,last_name,email,password,role from ${loginType.split(' ').join('_')} where email='${email}'`;
    } else if (loginType === 'exam coord') {
      id = "coord_id";
      sql = `select ${id},first_name,last_name,email,password,phone,dept_id,address,role from ${loginType.split(' ').join('_')} where email='${email}'`;
    } else if (loginType === 'admin') {
      id = "admin_id";
      sql = `select ${id},first_name,last_name,email,password,phone,dept_id,address,role from ${loginType} where email='${email}'`;
    } else {
      if (loginType === 'faculty') {
        id = "faculty_id";
      } else if (loginType === 'staff') {
        id = "staff_id";
      }
      sql = `select ${id},first_name,last_name,email,password,phone,dept_id,address,role from ${loginType} where email='${email}' and status='approved'`;
    }
    const [user] = await db.execute(sql);
    // res.send({success:true});
    if (user.length === 0) {
      throw new Error("Invalid email or password");
    } else {
      const fetchedUser = user[0];
      bcrypt.compare(password, fetchedUser.password).then((isEqual) => {
        if (!isEqual) {
          return res.status(404).send({
            error: "Invalid Email or password",
          });
        }
        const token = jwt.sign(
          { email: fetchedUser.email, deptId: fetchedUser.dept_id, firstName: fetchedUser.first_name, lastName: fetchedUser.last_name, id: fetchedUser[id] },
          process.env.SECRET_KEY,
        );
        res.status(200).json({
          token: token,
          user: {
            id: fetchedUser[id],
            first_name: fetchedUser.first_name,
            last_name: fetchedUser.last_name,
            imagePath: fetchedUser.image_path,
            email: fetchedUser.email,
            address: fetchedUser.address,
            phone: fetchedUser.phone,
            courseId: fetchedUser.course_id,
            deptId: fetchedUser.dept_id,
            role: fetchedUser.role,
            semester: fetchedUser.semester,
            classId:fetchedUser.class_id,
            eligibility:fetchedUser.eligibility
          }
        });
      });
    }
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
}

