const { Client } = require('pg');

// Database connection details
const dbConfig = {
  user: 'admin',
  password: 'password',
  host: 'localhost',
  database: 'DBMS',
};

// Generate random student and course IDs
function getRandomStudentId(client) {
  const query = `SELECT student_id FROM student ORDER BY RANDOM() LIMIT 1`;
  return client.query(query)
    .then((result) => result.rows[0].student_id);
}

function getRandomCourseId(client) {
  const query = `SELECT course_id FROM course ORDER BY RANDOM() LIMIT 1`;
  return client.query(query)
    .then((result) => result.rows[0].course_id);
}

function getRandomGrade() {
  const minVal = 1;
  const maxVal = 10;
  return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
}


// Main function to generate and insert enrollments
async function generateEnrollments() {
  const client = new Client(dbConfig);
  await client.connect();

  for(let i = 0; i < 75; i++) {
    const studentId = await getRandomStudentId(client);
    const courseId = await getRandomCourseId(client);
    const grade = getRandomGrade();
    console.log(`Inserting enrollment: Student ID: ${studentId}, Course ID: ${courseId}, Grade: ${grade}`);
    const query = `
      INSERT INTO enrollment (student_id, course_id, grade)
      VALUES ($1, $2, $3)
    `;

    await client.query(query, [studentId, courseId, grade]);
  }
  
}

generateEnrollments()
  .catch((error) => console.error(`Error generating enrollments: ${error}`));