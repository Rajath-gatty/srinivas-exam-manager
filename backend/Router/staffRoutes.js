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

router.get('/payments/pending/:type',isAuth,staffController.getPendingPayments);
router.post('/payments/approval/:approvalType',isAuth,staffController.postPaymentApproval);
router.get('/payments/:type',isAuth,staffController.getPayments);

router.get('/paymentdetails/:paymentId',isAuth,staffController.getPaymentDetails);
router.get('/subjectdetails/:paymentId',isAuth,staffController.getSubjectDetails);
router.post('/payments/reciept',isAuth,staffController.getPaymentReciept);

router.post('/halltickets',isAuth,staffController.generateBulkHallticket);
router.post('/eligibility',isAuth,staffController.setStudentEligibility);

module.exports = router;