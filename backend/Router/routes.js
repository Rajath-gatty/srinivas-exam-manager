const router = require('express').Router();
const routeContoller = require('../Controllers/routeController');
const isAuth = require('../middleware/isAuth');

router.get('/departments',routeContoller.getDepartments);
router.post('/courses',routeContoller.getCourses);

router.post('/users/student',isAuth,routeContoller.getAllStudent);
router.get('/users/faculty',isAuth,routeContoller.getAllFaculty);
router.get('/users/staff',isAuth,routeContoller.getAllStaff);
router.get('/users/examcoord',isAuth,routeContoller.getAllExamCoord);

module.exports = router;