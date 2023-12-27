const {Router} = require('express');
const controller = require('./controller');

const EnrollmentRouter = Router();


EnrollmentRouter.get('/', controller.getEnrollments);
EnrollmentRouter.get('/enroll', (req, res) => {
    if (req.query.id) {
        controller.getEnrollmentById(req, res);
    } else if (req.query.student_id) {
        controller.getEnrollmentByStudentId(req, res);
    } else if (req.query.course_id) {
        controller.getEnrollmentByCourseId(req, res);
    } else {
        res.status(400).send('Missing id, student_id or course_id query parameter');
    }
});
EnrollmentRouter.post('/', controller.addEnrollment);
EnrollmentRouter.delete('/enroll', controller.deleteEnrollment);
EnrollmentRouter.put('/enroll', controller.updateEnrollmentGrade);

module.exports = EnrollmentRouter;
