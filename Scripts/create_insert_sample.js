const { Client } = require('pg');
const { faker } = require('@faker-js/faker');

const client = new Client({
    host: 'localhost',
    user: 'admin',
    port: 5432,
    password: 'password',
    database: 'DBMS'
});

client.connect();

// Function to insert 30 values into the Student table
async function insertStudents() {
    for (let i = 0; i < 10000; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName });

        try {
            // SQL query to insert a new student record
            const insertQuery = 'INSERT INTO student (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING student_id';

            // Execute the query with the current data
            const result = await client.query(insertQuery, [firstName, lastName, email]);

            // Fetch the automatically generated student ID
            const studentId = result.rows[0].stuid;

            // Print information about the inserted record
            console.log(`Inserted Student ID: ${studentId}, Name: ${firstName} ${lastName}, Email: ${email}`);
        } catch (error) {
            console.error('Error inserting data:', error.message);
        }
    }

    // Close the database connection
    client.end();
}

async function createCourse() {
    const createQuery = `
        CREATE TABLE course
        (
            "course_id" SERIAL PRIMARY KEY,
            "name" text NOT NULL,
            "credits" integer NOT NULL,
            "instructor_id" integer NOT NULL
        )
    `
    try {
        const result = await client.query(createQuery);
        console.log('Table Course created successfully');
    } catch (error) {
        console.error('Error creating table:', error.message);
    }
}

async function createEnrollment() {
    const query = `
        CREATE TABLE enrollment
        (
            enrollment_id SERIAL PRIMARY KEY,
            student_id integer NOT NULL REFERENCES student(student_id),
            course_id integer NOT NULL REFERENCES course(course_id),
            grade integer NOT NULL
        )
    `
    try {
        const result = await client.query(query);
        console.log('Table Enrollment created successfully');
    } catch (error) {
        console.error('Error creating table:', error.message);
    }
}

async function createStudent() {
    {
        const query = `
        CREATE TABLE student
        (
            student_id SERIAL PRIMARY KEY,
            first_name text NOT NULL,
            last_name text NOT NULL,
            email text NOT NULL
        )
    `
        try {
            const result = await client.query(query);
            console.log('Table Enrollment created successfully');
        } catch (error) {
            console.error('Error creating table:', error.message);
        }
    }
}

const courses_array = ["Math", "English", "Chemistry", "Physics", "Biology", "History", "Geography", "Literature", "Computer Science", "Physical Education"]
const instructor_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const grade_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


// Function to insert 50 values into the Course table
async function insertCourses() {
    for (let i = 0; i < 10; i++) {
        const name = courses_array[i];
        const credits = faker.number.int({ min: 1, max: 4 });
        const instructor_id = instructor_array[Math.floor(Math.random() * instructor_array.length)];

        try {
            // SQL query to insert a new student record
            const insertQuery = 'INSERT INTO course (name, credits, instructor_id) VALUES ($1, $2, $3) RETURNING course_id';

            // Execute the query with the current data
            const result = await client.query(insertQuery, [name, credits, instructor_id]);

            // Fetch the automatically generated student ID
            const courseId = result.rows[0].course_id;

            // Print information about the inserted record
            console.log(`Inserted Course ID: ${courseId}, Name: ${name}, Credits: ${credits}, Instructor ID: ${instructor_id}`);
        } catch (error) {
            console.error('Error inserting data:', error.message);
        }
    }

    // Close the database connection
    client.end();
}

// Function to insert values into the enrollment table
async function insertEnrollment() {
    for (let i = 0; i < 50; i++) {
        const student_id = faker.number.int({ min: 1, max: 20000 });
        const course_id = faker.number.int({ min: 41, max: 50 });
        const grade = grade_array[Math.floor(Math.random() * grade_array.length)];

        try {
            // SQL query to insert a new enrollment record
            const insertQuery = 'INSERT INTO enrollment (student_id, course_id, grade) VALUES ($1, $2, $3) RETURNING enrollment_id';

            // Execute the query with the current data
            const result = await client.query(insertQuery, [student_id, course_id, grade]);

            // Fetch the automatically generated enrollment ID
            const enrollmentId = result.rows[0].enrollment_id;

            // Print information about the inserted record
            console.log(`Inserted Enrollment ID: ${enrollmentId}, Student ID: ${student_id}, Course ID: ${course_id}, Grade: ${grade}`);
        } catch (error) {
            console.error('Error inserting data:', error.message);
        }
    }
}


async function createSuperUser() {
    const query = `
        CREATE 
    `
    try {
        const result = await client.query(query);
        console.log('Table Super User created successfully');
    } catch (error) {
        console.error('Error creating table:', error.message);
    }

}

// insertStudents();
// createCourse();
createEnrollment();
// createStudent();
// insertCourses();
// insertEnrollment();