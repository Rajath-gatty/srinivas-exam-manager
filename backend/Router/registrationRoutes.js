const router = require("express").Router();
const controllers = require("../Controllers/registrationController");
const db = require("../db");
const path = require('path');
const { body } = require("express-validator");
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const imgPath = path.join(__dirname,'..','uploads');
      cb(null, imgPath)
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, Date.now()+file.originalname)
    }
  })

const upload = multer({ storage: storage });

//Student Post Request
router.post(
  "/registration/student",[
    body("firstName").trim().isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
    body("regno").trim().isLength({ min: 5 }).withMessage("Enter valid Registration No.").custom(async (value) => {
      const result = await db.execute(
        `SELECT regno FROM student WHERE regno='${value}'`
      );
      if (result[0].length > 0) {
        return Promise.reject("This Register no. already registered");
      }
    }),
    body("gender").trim().isIn(["male", "female", "others"]).withMessage("Please specify Gender"),
    body("dob").trim().isDate({ format: "DD/MM/YYYY" }).withMessage("Please Enter Valid Date"),
    body("email").isEmail().withMessage("Enter valid Email ID").custom(async (value) => {
        const result = await db.execute(
          `SELECT email FROM student WHERE email='${value}'`
        );
        if (result[0].length > 0) {
          return Promise.reject("E-mail already in use");
        }
      }),
    body("phone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid phone number"),
    body("address").trim().isLength({ min: 1 }).withMessage("Address cannot be empty"),
    body("bloodGroup").trim().notEmpty().withMessage("Enter a valid blood group"),
    body("caste").trim().isLength({ min: 1 }).withMessage("Caste cannot be empty"),
    body("aadharNo").trim().isLength({ min: 12, max: 12 }).withMessage("Enter valid Aadhar number"),
    body("religion").trim().notEmpty().withMessage("Enter religion"),
    body("birthPlace").trim().notEmpty().withMessage("Birth place cannot be empty"),
    body("birthDistrict").trim().notEmpty().withMessage("Birth District cannot be empty"),
    body("country").trim().notEmpty().withMessage("Country cannot be empty"),
    body("pincode").trim().isLength({ min: 6, max: 6 }).withMessage("Enter valid pincode"),
    body("password").trim().isLength({ min: 5 }).withMessage("Password must contain atleast 5 characters"),
    body("fatherName").trim().notEmpty().withMessage("Father name cannot be empty"),
    body("fatherOccupation").trim().notEmpty().withMessage("Father Occupation cannot be empty"),
    body("fatherPhone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid Phone number"),
    body("fatherEmail").isEmail().withMessage("Enter valid Email ID"),
    body("motherName").trim().notEmpty().withMessage("Mother name cannot be empty"),
    body("motherOccupation").trim().notEmpty().withMessage("Mother Occupation cannot be empty"),
    body("motherPhone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid Phone number"),
    body("motherEmail").isEmail().withMessage("Enter valid Email ID"),
    body("department").trim().notEmpty().withMessage("Select Department"),
    body("course").trim().notEmpty().withMessage("Select Course"),
    body("joiningYear").trim().notEmpty().withMessage("Enter Joining Year"),
  ],upload.single("image"),
  controllers.postStudent
);

//Faculty Post Request
router.post(
  "/registration/faculty",[
    body("firstName").trim().isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
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
    body("address").trim().isLength({ min: 1 }).withMessage("Address cannot be empty"),
    body("bloodGroup").trim().notEmpty().withMessage("Enter a valid blood group"),
    body("caste").trim().isLength({ min: 1 }).withMessage("Caste cannot be empty"),
    body("aadharNo").trim().isLength({ min: 12, max: 12 }).withMessage("Enter valid Aadhar number"),
    body("religion").trim().notEmpty().withMessage("Enter religion"),
    body("birthPlace").trim().notEmpty().withMessage("Birth place cannot be empty"),
    body("birthDistrict").trim().notEmpty().withMessage("Birth District cannot be empty"),
    body("country").trim().notEmpty().withMessage("Country cannot be empty"),
    body("pincode").trim().isLength({ min: 6, max: 6 }).withMessage("Enter valid pincode"),
    body("password").trim().isLength({ min: 5 }).withMessage("Password must contain atleast 5 characters"),
    body("fatherName").trim().notEmpty().withMessage("Father name cannot be empty"),
    body("fatherOccupation").trim().notEmpty().withMessage("Father Occupation cannot be empty"),
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
    body("firstName").trim().isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
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
    body("address").trim().isLength({ min: 1 }).withMessage("Address cannot be empty"),
    body("bloodGroup").trim().notEmpty().withMessage("Enter a valid blood group"),
    body("caste").trim().isLength({ min: 1 }).withMessage("Caste cannot be empty"),
    body("aadharNo").trim().isLength({ min: 12, max: 12 }).withMessage("Enter valid Aadhar number"),
    body("religion").trim().notEmpty().withMessage("Enter religion"),
    body("birthPlace").trim().notEmpty().withMessage("Birth place cannot be empty"),
    body("birthDistrict").trim().notEmpty().withMessage("Birth District cannot be empty"),
    body("country").trim().notEmpty().withMessage("Country cannot be empty"),
    body("pincode").trim().isLength({ min: 6, max: 6 }).withMessage("Enter valid pincode"),
    body("password").trim().isLength({ min: 5 }).withMessage("Password must contain atleast 5 characters"),
    body("fatherName").trim().notEmpty().withMessage("Father name cannot be empty"),
    body("fatherOccupation").trim().notEmpty().withMessage("Father Occupation cannot be empty"),
    body("fatherPhone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid Phone number"),
    body("department").trim().notEmpty().withMessage("Select Department"),
    body("joiningYear").trim().notEmpty().withMessage("Enter Joining Year"),
  ],
  controllers.postStaff
);

router.post('/login',controllers.postLogin);


module.exports = router;
