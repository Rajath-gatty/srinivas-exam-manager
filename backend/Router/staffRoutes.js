const router = require('express').Router();
const staffController = require('../Controllers/staffController');

router.post('/approvelist/student',staffController.getStudentApproveList);
router.get('/approve/student/view/:id',staffController.getApproveStudentDetail);
router.post('/approve/student/:id',staffController.postApproveStudent);
router.post('/reject/student/:id',staffController.postRejectStudent);

router.post('/approvelist/faculty',staffController.getFacultyApproveList);
router.get('/approve/faculty/view/:id',staffController.getApproveFacultyDetail);
router.post('/approve/faculty/:id',staffController.postApproveFaculty);
router.post('/reject/faculty/:id',staffController.postRejectFaculty);

module.exports = router;