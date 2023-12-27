const getStudents = `SELECT * FROM student`
const getStudentById = `SELECT * FROM student WHERE student_id = $1`
const getStudentByLastName = `SELECT * FROM student WHERE last_name = $1`
const addStudent = `INSERT INTO student (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *`
const deleteStudent = `DELETE FROM student WHERE student_id = $1`
const updateStudent = `UPDATE student SET first_name = $1, last_name = $2, email = $3 WHERE student_id = $4`
// const checkEmailExist = `SELECT * FROM student WHERE email = $1`


const checkEmailExist = `SELECT * FROM student WHERE email = $1`



// query with a composite condition
const getStudentByFullName = `SELECT * FROM student WHERE first_name = $1 AND last_name = $2`


// query with a subquery
const getStudentInCourse = `
    SELECT * 
    FROM student 
    WHERE student_id IN 
        (SELECT student_id 
        FROM enrollment 
        WHERE course_id = $1)`


// query with a join
const getStudentInCourseWithGrade = `
    SELECT * 
    FROM student 
    JOIN enrollment 
        ON student.student_id = enrollment.student_id 
    WHERE course_id = $1 
        AND grade >= $2 
        AND grade <= $3`





module.exports = {
    getStudents,
    getStudentById,
    getStudentByLastName,
    addStudent,
    deleteStudent,
    updateStudent,

    checkEmailExist,

    getStudentByFullName,
    getStudentInCourseWithGrade,
    getStudentInCourse,
}