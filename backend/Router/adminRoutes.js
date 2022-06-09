const router = require('express').Router();
const adminController = require('../Controllers/adminController');
const {body} = require('express-validator');

router.post('/new-course',[
    body('name').notEmpty().withMessage('Enter course name'),
    body('duration').notEmpty().withMessage('Select Duration')
],adminController.postNewCourse);

module.exports = router;