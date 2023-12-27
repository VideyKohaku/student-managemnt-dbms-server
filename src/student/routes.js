const express = require('express');
const router = express.Router();
const { 
    getStudents, 
    getStudentById,
    getStudentByLastName,
    addStudent,
    deleteStudent,
    updateStudent,
    getStudentByFullName,
    getStudentInCourseWithGrade,
    getStudentInCourse
} = require('./controller');

// Define your route
router.get('/', getStudents);
router.get('/student', (req, res) => {
    switch (req.query.filterType){
        case 'id':
            getStudentById(req, res);
            break;
        case 'lastName':
            console.log('lastName');
            getStudentByLastName(req, res);
            break;
        case 'fullName':
            // last_name, first_name
            getStudentByFullName(req, res);
            break;
        case 'courseGrade':
            // course_id, min_grade, max_grade
            getStudentInCourseWithGrade(req, res);
            break;
        case 'course':
            // course_id
            console.log('course');
            getStudentInCourse(req, res);
            break;
        default:
            res.status(400).send('Missing filterType query parameter');
    }

});
router.post('/', addStudent);
router.delete('/student', deleteStudent);
router.put('/student', updateStudent);



// Export the router
module.exports = router;
