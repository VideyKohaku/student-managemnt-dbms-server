const queries = require('./queries');
const pool = require('../../db_connect');

const getEnrollments = async (req, res) => {
    await pool.query(queries.getEnrollments, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

const getEnrollmentById = async (req, res) => {
    console.log("getEnrollmentById");
    await pool.query(queries.getEnrollmentById, [req.query.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

const getEnrollmentByStudentId = async (req, res) => {
    console.log("getEnrollmentByStudentId");
    await pool.query(queries.getEnrollmentsByStudentId, [req.query.student_id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

const getEnrollmentByCourseId = async (req, res) => {
    await pool.query(queries.getEnrollmentsByCourseId, [req.query.course_id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}


const addEnrollment = async (req, res) => {
    console.log("addEnrollment");
    try {
        const { student_id, course_id, grade } = req.body;

        // Validate request body
        if (!student_id || !course_id) {
            return res.status(400).send('student_id and course_id are required');
        }

        // Check if student_id exists
        const studentExist = await pool.query(queries.checkStudentExist, [student_id]);
        if (studentExist.rows.length === 0) {
            return res.status(400).send('Student does not exist');
        }

        // Check if course_id exists
        const courseExist = await pool.query(queries.checkCourseExist, [course_id]);
        if (courseExist.rows.length === 0) {
            return res.status(400).send('Course does not exist');
        }

        // Insert into table
        const addResult = await pool.query(queries.addEnrollment, [student_id, course_id, grade]);
        const enrollmentResult = addResult.rows[0];
        res.status(201).json(enrollmentResult);
    } catch (error) {
        throw error;
    }
}


const deleteEnrollment = async (req, res) => {
    try {
        const { enrollment_id } = req.query;

        // Validate request body
        if (!enrollment_id) {
            return res.status(400).send('enrollment_id is required');
        }

        // Check if enrollment_id exists
        const enrollmentExist = await pool.query(queries.checkEnrollmentExist, [enrollment_id]);
        if (enrollmentExist.rows.length === 0) {
            return res.status(400).send('Enrollment does not exist');
        }

        // Delete from table
        await pool.query(queries.deleteEnrollment, [enrollment_id]);
        res.status(200).send(`Enrollment deleted with ID: ${enrollment_id}`);
    } catch (error) {
        throw error;
    }
}


const updateEnrollmentGrade = async (req, res) => {
    const { enrollment_id, grade } = req.body;

    // Validate request body
    if (!enrollment_id || !grade) {
        return res.status(400).send('enrollment_id and grade are required');
    }

    // Check if enrollment_id exists
    pool.query(queries.checkEnrollmentExist, [enrollment_id], (error, results) => {
        if (results.rows.length === 0) {
            return res.status(400).send('Enrollment does not exist');
        }  

        // Update table
        pool.query(queries.updateEnrollmentGrade, [grade, enrollment_id], (error, results) => {
            if (error) {
                throw error;
            }
            
            res.status(200).send(`Enrollment updated with ID: ${enrollment_id}`);
        });
    });
}



module.exports = {
    getEnrollments,
    getEnrollmentById,
    getEnrollmentByStudentId,
    getEnrollmentByCourseId,
    addEnrollment,
    deleteEnrollment,
    updateEnrollmentGrade,
}