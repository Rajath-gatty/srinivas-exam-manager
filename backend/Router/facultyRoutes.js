const router = require('express').Router();
const facultyContoller = require('../Controllers/facultyController');
const isAuth = require('../middleware/isAuth');

router.post('/teaching/subjects',isAuth,facultyContoller.getFacultySubjects);

module.exports = router;