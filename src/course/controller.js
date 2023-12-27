const pool = require('../../db_connect');
const queries = require('./queries');

const getCourses = async (req, res) => {
    await pool.query(queries.getCourses, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};


const getCourseById = async (req, res) => {
    await pool.query(queries.getCourseById, [req.query.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};


const getCourseByName = async (req, res) => {
    pool.query(queries.getCourseByName, [req.query.name], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getCourseWithEnrollmentCount = async (req, res) => {
    await pool.query(queries.getCourseWithEnrollmentCount, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}


const getCoursesEnrolledByStudent = async (req, res) => {
    await pool.query(queries.getCoursesEnrolledByStudent, [req.query.student_id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

module.exports = { 
    getCourses,
    getCourseById,
    getCourseByName,
    getCourseWithEnrollmentCount,
    getCoursesEnrolledByStudent,
}