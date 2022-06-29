const router = require('express').Router();
const studentController = require('../Controllers/studentController');
const isAuth = require('../middleware/isAuth');
const {check} = require('express-validator');
const upload = require('../middleware/multer');

router.post('/application/regular',upload.single('reciept'),[
    check('bank').trim().isLength({min:3}).withMessage('Enter valid Bank name'),
    check('accno').trim().isLength({min:3}).isNumeric().withMessage('Enter valid accno'),
    check('transaction').trim().isLength({min:3}).withMessage('Enter valid transaction ID'),
    check('date').isDate({ format: "YYYY/MM/DD" }).withMessage('Enter valid Date')
],isAuth,studentController.postRegularPayment);

router.post('/application/repeater',upload.single('reciept'),[
    check('bank').trim().isLength({min:3}).withMessage('Enter valid Bank name'),
    check('accno').trim().isLength({min:3}).isNumeric().withMessage('Enter valid accno'),
    check('transaction').trim().isLength({min:3}).withMessage('Enter valid transaction ID'),
    check('date').isDate({ format: "YYYY/MM/DD" }).withMessage('Enter valid Date')
],isAuth,studentController.postRepeaterPayment);

router.post('/application/subjects',isAuth,studentController.getStudentSubjects);

router.post('/timetable',isAuth,studentController.getStudentTimetable);

router.post('/internal/marks',isAuth,studentController.getStudentInternalMarks);

router.post('/hallticket',isAuth,studentController.generateHallTicket);

module.exports = router;