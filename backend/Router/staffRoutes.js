const router = require('express').Router();
const staffController = require('../Controllers/staffController');

router.post('/approve/student',staffController.postApproveStudent)

module.exports = router;