const express = require('express');
const router = express.Router();
const { 
    getStudents, 
    getStudentById,
    getStudentByLastName,
    addStudent,
    deleteStudent
} = require('./controller');
const { de } = require('@faker-js/faker');

// Define your route
router.get('/', getStudents);
router.get('/student', (req, res) => {
    if (req.query.id) {
        getStudentById(req, res);
    } else if (req.query.lastName) {
        getStudentByLastName(req, res);
    } else {
        res.status(400).send('Missing id or lastName query parameter');
    }
});
router.post('/', addStudent);
router.delete('/student', deleteStudent);

// Export the router
module.exports = router;
