const { query } = require("express")

const addCourse = `INSERT INTO course (name, credits, instructor) VALUES ($1, $2, $3) RETURNING *`
const getCourses = `SELECT * FROM course`
const getCourseById = `SELECT * FROM course WHERE course_id = $1`
const getCourseByName = `SELECT * FROM course WHERE name = $1`
const deleteCourse = `DELETE FROM course WHERE course_id = $1`


// query with aggregate function
const getCourseWithEnrollmentCount = `
    SELECT course.course_id, course.name, course.credits, COUNT(enrollment_id) AS enrollment_count
    FROM course
    LEFT JOIN enrollment
        ON course.course_id = enrollment.course_id
    GROUP BY course.course_id
    ORDER BY course.course_id
`

const getCourseNotEnrolled = `
    SELECT *
    FROM course
    WHERE course_id NOT IN (
        SELECT course_id
        FROM enrollment
        WHERE student_id = $1
    )
`



const getCoursesEnrolledByStudent = `
SELECT course.*, enrollment.grade
FROM course
JOIN enrollment ON course.course_id = enrollment.course_id
WHERE enrollment.student_id = $1
`

module.exports = {
    addCourse,
    getCourses,
    getCourseById,
    getCourseByName,
    deleteCourse,

    getCourseWithEnrollmentCount,
    getCoursesEnrolledByStudent,
}
