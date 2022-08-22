const router = require('express').Router();
const facultyContoller = require('../Controllers/facultyController');
const isAuth = require('../middleware/isAuth');

router.post('/teaching/subjects',isAuth,facultyContoller.getFacultySubjects);
router.post('/semestermark',isAuth,facultyContoller.postSemesterMark)
router.post('/marksattendance/add',isAuth,facultyContoller.postMarksAttendance);
router.post('/classroom/semestermarks',isAuth,facultyContoller.postFetchClassroomMarks);
router.post('/classroom/studentsemmarks',isAuth,facultyContoller.postFetchStudentSemMarks);

module.exports = router;