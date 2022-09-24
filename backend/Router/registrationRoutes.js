const router = require("express").Router();
const controllers = require("../Controllers/registrationController");
const db = require("../db");
const fs = require('fs');
const { body,check,validationResult} = require("express-validator");
const upload = require('../middleware/multer');

const validate = (req,res,next) => {
  const err = validationResult(req).errors;
  if (err.length > 0) {
     res.status(400).send({ success: false, err });
    //  if(req.file) {
    //   fs.unlink(req.file.path,(err)=>console.log(err));
    //  }
     return;
  }
  next();
}

//Student Post Request
router.post(
  "/registration/student",
  upload.single("studentProfile"),[
    check("firstName").trim().isAlpha().withMessage("Name must be characters").isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
    check("regno").trim().isLength({ min: 5 }).withMessage("Enter valid Registration No.").toUpperCase().custom(async (value) => {
      const result = await db.execute(
        `SELECT regno FROM student WHERE regno='${value}'`
      );
      if (result[0].length > 0) {
        return Promise.reject("This Register no. already registered");
      }
    }),
    check("gender").trim().isIn(["male", "female", "others"]).withMessage("Please specify Gender"),
    check("dob").trim().isDate({ format: "DD/MM/YYYY" }).withMessage("Please Enter Valid Date"),
    check("email").isEmail().withMessage("Enter valid Email ID").custom(async (value) => {
        const result = await db.execute(
          `SELECT email FROM student WHERE email='${value}'`
        );
        if (result[0].length > 0) {
          return Promise.reject("E-mail already in use");
        }
      }),
    check("phone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid phone number"),
    check("address").trim().isLength({ min: 1 }).withMessage("Address cannot be empty"),
    check("bloodGroup").trim().notEmpty().withMessage("Enter a valid blood group"),
    check("caste").trim().isAlpha().withMessage("Caste must be characters").isLength({ min: 1 }).withMessage("Caste cannot be empty"),
    check("aadharNo").trim().isLength({ min: 12, max: 12 }).withMessage("Enter valid Aadhar number"),
    check("religion").trim().notEmpty().withMessage("Enter religion").isAlpha().withMessage("value must be characters"),
    check("birthPlace").trim().notEmpty().withMessage("Birth place cannot be empty").isAlpha().withMessage("value must be characters"),
    check("birthDistrict").trim().notEmpty().withMessage("Birth District cannot be empty").isAlpha().withMessage("value must be characters"),
    check("country").trim().notEmpty().withMessage("Country cannot be empty").isAlpha().withMessage("value must be characters"),
    check("pincode").trim().isLength({ min: 6, max: 6 }).withMessage("Enter valid pincode"),
    check("password").trim().isLength({min:5}).withMessage("Password must contain At least 8 characters the more characters the better, mixture of both uppercase and lowercase letters, mixture of letters and numbers, inclusion of at least one special character, e.g., ! @ # ? "),
    check("fatherName").trim().notEmpty().withMessage("Father name cannot be empty"),
    check("fatherOccupation").trim().notEmpty().withMessage("Father Occupation cannot be empty").isAlpha().withMessage("value must be characters"),
    check("fatherPhone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid Phone number"),
    check("fatherEmail").isEmail().withMessage("Enter valid Email ID"),
    check("motherName").trim().notEmpty().withMessage("Mother name cannot be empty").isAlpha().withMessage("value must be characters"),
    check("motherOccupation").trim().notEmpty().withMessage("Mother Occupation cannot be empty").isAlpha().withMessage("value must be characters"),
    check("motherPhone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid Phone number"),
    check("motherEmail").isEmail().withMessage("Enter valid Email ID"),
    check("department").trim().notEmpty().withMessage("Select Department"),
    check("course").trim().notEmpty().withMessage("Select Course"),
    check("joiningYear").trim().notEmpty().withMessage("Enter Joining Year"),
  ],
  validate,
  controllers.postStudent
);

//Faculty Post Request
router.post(
  "/registration/faculty",[
    body("firstName").isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long").isAlpha().withMessage("value must be characters"),
    body("facultyId").trim().isLength({ min: 5 }).withMessage("Enter valid Faculty ID").custom(async (value) => {
        const result = await db.execute(
          `SELECT faculty_id FROM faculty WHERE faculty_id='${value}'`
        );
        if (result[0].length > 0) {
          return Promise.reject("This FacultyID already registered");
        }
      }),
    body("gender").trim().isIn(["male", "female", "others"]).withMessage("Please specify Gender"),
    body("dob").trim().isDate({ format: "DD/MM/YYYY" }).withMessage("Please Enter Valid Date"),
    body("email").isEmail().withMessage("Enter valid Email ID").custom(async (value) => {
        const result = await db.execute(
          `SELECT email FROM faculty WHERE email='${value}'`
        );
        if (result[0].length > 0) {
          return Promise.reject("E-mail already in use");
        }
      }),
    body("phone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid phone number"),
    body("address").trim().isLength({ min: 1 }).withMessage("Address cannot be empty").isAlpha().withMessage("value must be characters"),
    body("bloodGroup").trim().notEmpty().withMessage("Enter a valid blood group"),
    body("caste").trim().isLength({ min: 1 }).withMessage("Caste cannot be empty").isAlpha().withMessage("value must be characters"),
    body("aadharNo").trim().isLength({ min: 12, max: 12 }).withMessage("Enter valid Aadhar number"),
    body("religion").trim().notEmpty().withMessage("Enter religion").isAlpha().withMessage("value must be characters"),
    body("birthPlace").trim().notEmpty().withMessage("Birth place cannot be empty").isAlpha().withMessage("value must be characters"),
    body("birthDistrict").trim().notEmpty().withMessage("Birth District cannot be empty").isAlpha().withMessage("value must be characters"),
    body("country").trim().notEmpty().withMessage("Country cannot be empty").isAlpha().withMessage("value must be characters"),
    body("pincode").trim().isLength({ min: 6, max: 6 }).withMessage("Enter valid pincode"),
    body("password").trim().isStrongPassword({ minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1
  }).withMessage("Password must contain At least 8 characters the more characters the better, mixture of both uppercase and lowercase letters, mixture of letters and numbers, inclusion of at least one special character, e.g., ! @ # ? "),
    body("fatherName").trim().notEmpty().withMessage("Father name cannot be empty").isAlpha().withMessage("value must be characters"),
    body("fatherOccupation").trim().notEmpty().withMessage("Father Occupation cannot be empty").isAlpha().withMessage("value must be characters"),
    body("fatherPhone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid Phone number"),
    body("department").trim().notEmpty().withMessage("Select Department"),
    body("teachingExp").trim().notEmpty().withMessage("Enter Teaching experience"),
    body("joiningYear").trim().notEmpty().withMessage("Enter Joining Year"),
  ],
  controllers.postFaculty
);

//Staff Post Request
router.post(
  "/registration/staff",[
    body("firstName").trim().isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long").isAlpha().withMessage("value must be characters"),
    body("gender").trim().isIn(["male", "female", "others"]).withMessage("Please specify Gender"),
    body("dob").trim().isDate({ format: "DD/MM/YYYY" }).withMessage("Please Enter Valid Date"),
    body("email").trim().isEmail().withMessage("Enter valid Email ID")
      .custom(async (value) => {
        const result = await db.execute(
          `SELECT email FROM staff WHERE email='${value}'`
        );
        if (result[0].length > 0) {
          return Promise.reject("E-mail already in use");
        }
      }),
    body("phone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid phone number"),
    body("address").trim().isLength({ min: 1 }).withMessage("Address cannot be empty").isAlpha().withMessage("value must be characters"),
    body("bloodGroup").trim().notEmpty().withMessage("Enter a valid blood group"),
    body("caste").trim().isLength({ min: 1 }).withMessage("Caste cannot be empty").isAlpha().withMessage("value must be characters"),
    body("aadharNo").trim().isLength({ min: 12, max: 12 }).withMessage("Enter valid Aadhar number"),
    body("religion").trim().notEmpty().withMessage("Enter religion").isAlpha().withMessage("value must be characters"),
    body("birthPlace").trim().notEmpty().withMessage("Birth place cannot be empty").isAlpha().withMessage("value must be characters"),
    body("birthDistrict").trim().notEmpty().withMessage("Birth District cannot be empty").isAlpha().withMessage("value must be characters"),
    body("country").trim().notEmpty().withMessage("Country cannot be empty").isAlpha().withMessage("value must be characters"),
    body("pincode").trim().isLength({ min: 6, max: 6 }).withMessage("Enter valid pincode"),
    body("password").trim().isStrongPassword({ minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1
  }).withMessage("Password must contain At least 8 characters the more characters the better, mixture of both uppercase and lowercase letters, mixture of letters and numbers, inclusion of at least one special character, e.g., ! @ # ? "),
    body("fatherName").trim().notEmpty().withMessage("Father name cannot be empty").isAlpha().withMessage("value must be characters"),
    body("fatherOccupation").trim().notEmpty().withMessage("Father Occupation cannot be empty").isAlpha().withMessage("value must be characters"),
    body("fatherPhone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid Phone number"),
    body("department").trim().notEmpty().withMessage("Select Department"),
    body("joiningYear").trim().notEmpty().withMessage("Enter Joining Year"),
  ],
  controllers.postStaff
);

router.post('/login',controllers.postLogin);


module.exports = router;
