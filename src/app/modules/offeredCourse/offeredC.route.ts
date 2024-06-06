import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseControllers } from './offeredC.controllers';
import { offeredCourseValidation } from './offeredC.validation';

const router = express.Router();
// will call controler function
router.post(
  '/create-offered-course',
  validateRequest(offeredCourseValidation.offeredCourseValidationZod),
  OfferedCourseControllers.createOfferedCourse,
);

//  crteate router for get all data(step-3)
router.get('/', OfferedCourseControllers.getAllOfferedCourse);

//  create router for get single data(step-3)
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);

//delete a single data
// router.delete('/:studentId', StudentControllers.deleteSingleStudent);

// update a single data
router.patch(
  '/:id',
  validateRequest(offeredCourseValidation.updateOfferedCourseValidationZod),
  OfferedCourseControllers.updateSingleOfferedCourse,
);

export const OfferedCourseRoutes = router;
