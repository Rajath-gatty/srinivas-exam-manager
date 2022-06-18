const router = require('express').Router();
const studentController = require('../Controllers/studentController');
const isAuth = require('../middleware/isAuth');

router.post('/timetable',isAuth,studentController.getStudentTimetable);

router.post('/hallticket',isAuth,studentController.generateHallTicket);

module.exports = router;