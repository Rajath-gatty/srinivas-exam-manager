const router = require('express').Router();
const db = require('../db');
const adminController = require('../Controllers/adminController');
const {body} = require('express-validator');

router.post('/new-course',[
    body('name').notEmpty().withMessage('Enter course name'),
    body('duration').notEmpty().withMessage('Select Duration')
],adminController.postNewCourse);


router.post('/department/new-department',[
    body("departmentName").trim().notEmpty().withMessage("Enter department name")
    .custom(async(value) => {
      const result = await db.execute(
        `SELECT dept_name FROM department WHERE dept_name='${value}'`
      );
      if (result[0].length > 0) {
        return Promise.reject("Department already exists");
      }
    }),
    body("firstName").trim().isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
    body("gender").trim().isIn(["male", "female", "others"]).withMessage("Please specify Gender"),
    body("dob").trim().isDate({ format: "DD/MM/YYYY" }).withMessage("Please Enter Valid Date"),
    body("email").trim().isEmail().withMessage("Enter valid Email ID")
      .custom(async (value) => {
        const result = await db.execute(
          `SELECT email FROM admin WHERE email='${value}'`
        );
        if (result[0].length > 0) {
          return Promise.reject("E-mail already in use");
        }
      }),
    body("phone").trim().isLength({ min: 10, max: 10 }).withMessage("Enter valid phone number"),
    body("address").trim().isLength({ min: 1 }).withMessage("Address cannot be empty"),
    body("password").trim().isLength({ min: 5 }).withMessage("Password must contain atleast 5 characters")
],adminController.postNewDepartment);

router.post('/courses',adminController.getCourses);

router.post('/course-details',adminController.getCourseDetails);

router.get('/departments',adminController.getDepartments);
module.exports = router;