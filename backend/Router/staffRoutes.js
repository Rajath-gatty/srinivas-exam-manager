const router = require('express').Router();
const staffController = require('../Controllers/staffController');
const isAuth = require('../middleware/isAuth');

router.post('/approvelist/student',isAuth,staffController.getStudentApproveList);
router.get('/approve/student/view/:id',isAuth,staffController.getApproveStudentDetail);
router.post('/approve/student/:id',isAuth,staffController.postApproveStudent);
router.post('/reject/student/:id',isAuth,staffController.postRejectStudent);

router.post('/approvelist/faculty',isAuth,staffController.getFacultyApproveList);
router.get('/approve/faculty/view/:id',isAuth,staffController.getApproveFacultyDetail);
router.post('/approve/faculty/:id',isAuth,staffController.postApproveFaculty);
router.post('/reject/faculty/:id',isAuth,staffController.postRejectFaculty);

module.exports = router;