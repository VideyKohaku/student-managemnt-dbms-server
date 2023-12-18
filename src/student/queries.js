const getStudents = `SELECT * FROM student`
const getStudentById = `SELECT * FROM student WHERE student_id = $1`
const getStudentByLastName = `SELECT * FROM student WHERE last_name = $1`
const addStudent = `INSERT INTO student (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING student_id`
const deleteStudent = `DELETE FROM student WHERE student_id = $1`

const checkEmailExist = `SELECT * FROM student WHERE email = $1`

module.exports = {
    getStudents,
    getStudentById,
    getStudentByLastName,
    addStudent,
    deleteStudent,

    checkEmailExist
}