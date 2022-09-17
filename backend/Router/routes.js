const router = require('express').Router();
const routeContoller = require('../Controllers/routeController');
const isAuth = require('../middleware/isAuth');

router.get('/departments',routeContoller.getDepartments);
router.post('/courses',routeContoller.getCourses);
router.post('/semesters',routeContoller.getSemesters);
router.post('/subjects',routeContoller.getSubjects);
router.post('/pushsubscribe',routeContoller.pushSubscribe);
router.post('/pushsendnotification',routeContoller.pushSendNotification);

router.get('/dashboard/users/count',isAuth,routeContoller.getUserCount);
router.post('/sidebar/notify',isAuth,routeContoller.postSidebarNotify);

router.post('/users/student',isAuth,routeContoller.getAllStudent);
router.post('/users/faculty',isAuth,routeContoller.getAllFaculty);
router.post('/users/staff',isAuth,routeContoller.getAllStaff);
router.post('/users/examcoordinator',isAuth,routeContoller.getAllExamCoord);

router.post('/users/student/semfilter',isAuth,routeContoller.getSemFilteredStudent);
router.post('/users/student/search',isAuth,routeContoller.getStudentByID);
router.post('/users/details',isAuth,routeContoller.getUserDetails);

router.get('/faculty/current-subjects/:facultyId',isAuth,routeContoller.getCurrentSubjects);
router.post('/faculty/subjects',isAuth,routeContoller.getFacultySubject);
router.post('/faculty/add-subjects',isAuth,routeContoller.PostFacultySubjects);
router.post('/faculty/subjects/delete',isAuth,routeContoller.removeFacultySubjects);

router.post('/forgot-password',routeContoller.postForgotPassword);
router.post('/reset-password',routeContoller.postResetPassword);

router.post('/classroom/create',isAuth,routeContoller.postCreateClassroom);
router.post('/classroom/add-student',isAuth,routeContoller.postAddStudentToClass);
router.post('/classroom/remove-student',isAuth,routeContoller.postRemoveStudent);
router.post('/classroom/promote',isAuth,routeContoller.postPromoteClassroom);
router.post('/classroom/demote',isAuth,routeContoller.postDemoteClassroom);
router.post('/classroom/delete',isAuth,routeContoller.postDeleteClassroom);
router.post('/classroom',isAuth,routeContoller.getClassroom);

module.exports = router;