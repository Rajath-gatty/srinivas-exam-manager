const router = require('express').Router();
const db = require('../db');
const adminController = require('../Controllers/adminController');
const {body} = require('express-validator');
const isAuth = require('../middleware/isAuth');

router.post('/new-course',isAuth,[
    body('name').notEmpty().withMessage('Enter course name'),
    body('duration').notEmpty().withMessage('Select Duration')
],adminController.postNewCourse);

router.post('/department/new-department',isAuth,[
    body("departmentName").trim().notEmpty().withMessage("Enter department name").isAlpha().withMessage("value must be characters")
    .custom(async(value) => {
      const result = await db.execute(
        `SELECT dept_name FROM department WHERE dept_name='${value}'`
      );
      if (result[0].length > 0) {
        return Promise.reject("Department already exists");
      }
    }),
    body("firstName").trim().isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long").isAlpha().withMessage("value must be characters"),
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
    body("address").trim().isLength({ min: 1 }).withMessage("Address cannot be empty").isAlpha().withMessage("value must be characters"),
    body("password").trim().isStrongPassword({ minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1
  }).withMessage("Password must contain At least 8 characters the more characters the better, mixture of both uppercase and lowercase letters, mixture of letters and numbers, inclusion of at least one special character, e.g., ! @ # ? ")
],adminController.postNewDepartment);

router.get('/courses',isAuth,adminController.getCourses);
router.post('/course-details',isAuth,adminController.getCourseDetails);
router.post('/courses/subjects/remove',isAuth,adminController.removeCourseSubjects);

router.post('/subjects',isAuth,adminController.fetchSubjects);
router.post('/codingsheet',isAuth,adminController.postCodingSheet);

router.get('/departments',isAuth,adminController.getDepartments);

router.get('/examcoordinators',isAuth,adminController.getExamCoordinators);

router.post('/registration/examcoordinator',isAuth,[
  body("departmentName").trim().notEmpty().withMessage("Select department").isAlpha().withMessage("value must be characters"),
  body("firstName").trim().isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long").isAlpha().withMessage("value must be characters"),
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
    body("address").trim().isLength({ min: 1 }).withMessage("Address cannot be empty").isAlpha().withMessage("value must be characters"),
    body("password").trim().isStrongPassword({ minLength: 8, minLowercase: 1,minUppercase: 1, minNumbers: 1, minSymbols: 1
  }).withMessage("Password must contain At least 8 characters the more characters the better, mixture of both uppercase and lowercase letters, mixture of letters and numbers, inclusion of at least one special character, e.g., ! @ # ? ")
],adminController.postNewCoordinator);

router.post('/approvelist/staff',isAuth,adminController.getStaffApproveList);
router.get('/approve/staff/view/:id',isAuth,adminController.getApproveStaffDetail);
router.post('/approve/staff/:id',isAuth,adminController.postApproveStaff);
router.post('/reject/staff/:id',isAuth,adminController.postRejectStaff);

router.post('/timetable/new',isAuth,adminController.postNewTimeTable);
router.post('/timetable/delete',isAuth,adminController.deleteTimetable);
router.get('/timetables',isAuth,adminController.getTimetables);

module.exports = router;