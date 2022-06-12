const router = require('express').Router();
const staffController = require('../Controllers/staffController');

router.post('/approvelist/student',staffController.getStudentApproveList);

router.get('/approve/student/view/:id',staffController.getApproveStudentDetail);
router.get('/approve/student/:id',staffController.getApproveStudent);
router.get('/reject/student/:id',staffController.getRejectStudent);

router.post('/approvelist/faculty',staffController.getFacultyApproveList);

router.post('/approve/faculty/:id',staffController.postApproveFaculty);
router.post('/reject/faculty/:id',staffController.postRejectFaculty);

module.exports = router;