const router = require('express').Router();
const examcoordController = require('../Controllers/examcoordController');
const isAuth = require('../middleware/isAuth');

router.get('/timetables',isAuth,examcoordController.getTimetables);
router.get('/timetables/:tId',isAuth,examcoordController.getTimetableDetails);
router.post('/timetable/approve/:tId',isAuth,examcoordController.postApproveTimetable);
router.post('/timetable/reject/:tId',isAuth,examcoordController.postRejectTimetable);

module.exports = router;