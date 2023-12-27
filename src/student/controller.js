const pool = require('../../db_connect');
const queries = require('./queries');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

const getStudentById = (req, res) => {
    pool.query(queries.getStudentById, [req.query.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

const getStudentByLastName = (req, res) => {
    console.log("getStudentByLastName");
    pool.query(queries.getStudentByLastName, [req.query.lastName], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

const addStudent = (req, res) => {
    const { first_name, last_name, email } = req.body;
    console.log(req.body);
    // Validate request body
    if (!first_name || !last_name || !email) {
        return res.status(400).send('first_name, last_name, and email are required');
    }
    // Check if email already exists
    pool.query(queries.checkEmailExist, [email], (error, results) => {
        if (results.rows.length > 0) {
            return res.status(400).send('Email already exists');
        }

        // Insert into table
        pool.query(queries.addStudent, [first_name, last_name, email], (error, results) => {
            if (error) {
                throw error;
            }

            const studentId = results.rows[0].student_id;
            res.status(201).json(results.rows[0]);
        });
    });


}


const deleteStudent = async (req, res) => {
    const { student_id } = req.query;

    // Validate request body
    if (!student_id) {
        return res.status(400).send('student_id is required');
    }

    try {
        // Check if student exists
        const studentResult = await pool.query(queries.getStudentById, [student_id]);
        if (studentResult.rows.length === 0) {
            return res.status(400).send('Student does not exist');
        }

        // Delete from table
        await pool.query(queries.deleteStudent, [student_id]);
        res.status(201).json({ student_id: student_id });
    } catch (error) {
        throw error;
    }
}


const updateStudent = async (req, res) => {
    const { student_id, first_name, last_name, email } = req.body;

    // Validate request body
    if (!student_id || !first_name || !last_name || !email) {
        return res.status(400).send('student_id, first_name, last_name, and email are required');
    }

    try {
        // Check if student exists
        const studentResult = await pool.query(queries.getStudentById, [student_id]);
        if (studentResult.rows.length === 0) {
            return res.status(400).send('Student does not exist');
        }

        // Check if email already exists (skip if new email is the same as old email)
        if (email !== studentResult.rows[0].email) {
            const emailResult = await pool.query(queries.checkEmailExist, [email]);
            if (emailResult.rows.length > 0) {
                return res.status(400).send('Email already exists');
            }
        }

        // Update table
        await pool.query(queries.updateStudent, [first_name, last_name, email, student_id]);
        // Get updated student
        const updatedStudentResult = await pool.query(queries.getStudentById, [student_id]);

        // Check if student exists
        if (updatedStudentResult.rows.length === 0) {
            return res.status(404).send('Student not found');
        }

        // Return updated student
        res.status(200).json(updatedStudentResult.rows[0]);
    } catch (error) {
        throw error;
    }
}


const getStudentByFullName = async (req, res) => {
    const { first_name, last_name } = req.query;

    // Validate request body
    if (!first_name || !last_name) {
        return res.status(400).send('first_name and last_name are required');
    }

    try {
        const result = await pool.query(queries.getStudentByFullName, [first_name, last_name]);
        res.status(200).json(result.rows);
    } catch (error) {
        throw error;
    }
}


const getStudentInCourseWithGrade = async (req, res) => {
    const { course_id, min_grade, max_grade } = req.query;

    // Validate request body
    if (!course_id || !min_grade || !max_grade) {
        return res.status(400).send('course_id, min_grade, and max_grade are required');
    }

    try {
        const result = await pool.query(queries.getStudentInCourseWithGrade, [course_id, min_grade, max_grade]);
        res.status(200).json(result.rows);
    } catch (error) {
        throw error;
    }
}


const getStudentInCourse = async (req, res) => {
    const { course_id } = req.query;

    console.log(course_id);
    // Validate request body
    if (!course_id) {
        return res.status(400).send('course_id is required');
    }

    try {
        console.log("getStudentInCourse");
        const result = await pool.query(queries.getStudentInCourse, [course_id]);
        console.log(result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getStudents,
    getStudentById,
    getStudentByLastName,
    addStudent,
    deleteStudent,
    updateStudent,

    getStudentByFullName,
    getStudentInCourseWithGrade,
    getStudentInCourse
};
