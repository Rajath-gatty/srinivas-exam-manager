const router = require('express').Router();
const routeContoller = require('../Controllers/routeController');
const isAuth = require('../middleware/isAuth');

router.get('/departments',routeContoller.getDepartments);
router.post('/courses',routeContoller.getCourses);
router.post('/semesters',routeContoller.getSemesters);

router.post('/users/student',isAuth,routeContoller.getAllStudent);
router.post('/users/faculty',isAuth,routeContoller.getAllFaculty);
router.post('/users/staff',isAuth,routeContoller.getAllStaff);
router.post('/users/examcoordinator',isAuth,routeContoller.getAllExamCoord);

router.post('/users/student/semfilter',isAuth,routeContoller.getSemFilteredStudent);

router.post('/users/details',isAuth,routeContoller.getUserDetails);

module.exports = router;