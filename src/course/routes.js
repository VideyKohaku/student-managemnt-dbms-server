const {  Router } = require('express');
const CourseRouter = Router();
const controller = require('./controller');


CourseRouter.get('/', controller.getCourses);
CourseRouter.get('/course', (req, res) => {
    switch(req.query.filterType)
    {
        case "id":
            controller.getCourseById(req, res);
            break;
        case "name":
            controller.getCourseByName(req, res);
            break;
        case "enrollmentCount":
            controller.getCourseWithEnrollmentCount(req, res);
            break;
        case "enrolledByStudent":
            controller.getCoursesEnrolledByStudent(req, res);
            break;
        default:
            res.status(400).send('Missing id or name query parameter');
    }
});
// CourseRouter.post('/', controller.addCourse);
// CourseRouter.delete('/course', controller.deleteCourse);

module.exports = CourseRouter;