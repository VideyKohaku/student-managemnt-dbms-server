const express = require('express');
const StudentRouter = require('./student/routes.js');
const CourseRouter = require('./course/routes.js');
const EnrollmentRouter = require('./enrollment/routes.js');

const router = express.Router();

router.use('/students', StudentRouter);
router.use('/courses', CourseRouter);
router.use('/enrollments', EnrollmentRouter);

module.exports = router;
