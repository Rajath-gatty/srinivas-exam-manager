const router = require('express').Router();
const routeContoller = require('../Controllers/routeController');

router.get('/departments',routeContoller.getDepartments);

router.post('/courses',routeContoller.getCourses);

module.exports = router;