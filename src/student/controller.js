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
    pool.query(queries.getStudentByLastName, [req.query.lastName], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
}

const addStudent = (req, res) => {
    const { first_name, last_name, email } = req.body;

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
            res.status(201).send(`Student added with ID: ${studentId}`);
        });
    });


}


const deleteStudent = (req, res) => {
    const { student_id } = req.query;

    // Validate request body
    if (!student_id) {
        return res.status(400).send('student_id is required');
    }

    // Check if student exists
    pool.query(queries.getStudentById, [student_id], (error, results) => {
        if (results.rows.length === 0) {
            return res.status(400).send('Student does not exist');
        }  

        // Delete from table
        pool.query(queries.deleteStudent, [student_id], (error, results) => {
            if (error) {
                throw error;
            }
            
            res.status(201).send(`Student deleted with ID: ${student_id}`);
        });
    });
}

module.exports = {
    getStudents,
    getStudentById,
    getStudentByLastName,
    addStudent,
    deleteStudent
};
