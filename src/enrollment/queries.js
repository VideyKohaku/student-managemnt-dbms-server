const getEnrollments = `SELECT * FROM enrollment`
const getEnrollmentById = `SELECT * FROM enrollment WHERE enrollment_id = $1`
const addEnrollment = `INSERT INTO enrollment (student_id, course_id, grade) VALUES ($1, $2, $3) RETURNING *`
const deleteEnrollment = `DELETE FROM enrollment WHERE enrollment_id = $1`
const addGrade = `UPDATE enrollment SET grade = $1 WHERE enrollment_id = $2 RETURNING *`

const checkEnrollmentExist = `SELECT * FROM enrollment WHERE enrollment_id = $1`
const checkStudentExist = `SELECT * FROM student WHERE student_id = $1`
const checkCourseExist = `SELECT * FROM course WHERE course_id = $1`

const updateEnrollmentGrade = `UPDATE enrollment SET grade = $1 WHERE enrollment_id = $2 RETURNING *`


const getEnrollmentsByStudentId = `SELECT * FROM enrollment WHERE student_id = $1`
const getEnrollmentsByCourseId = `SELECT * FROM enrollment WHERE course_id = $1`
// const 

// queries the requirement



module.exports = {
    getEnrollments,
    getEnrollmentById,
    getEnrollmentsByStudentId,
    getEnrollmentsByCourseId,
    addEnrollment,
    deleteEnrollment,
    addGrade,
    updateEnrollmentGrade,



    checkEnrollmentExist,
    checkStudentExist,
    checkCourseExist,
};