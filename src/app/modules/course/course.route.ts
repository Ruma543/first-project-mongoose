import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controllers';
const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourse);

router.get('/:id', CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateSingleCourse,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidation.assignFacultiesValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidation.assignFacultiesValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);
router.delete('/:id', CourseControllers.deleteSingleCourse);

export const CourseRoutes = router;
