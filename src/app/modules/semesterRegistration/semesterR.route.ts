import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidation } from './semesterR.validation';
import { SemesterRegistrationControllers } from './semesterR.controllers';

const router = express.Router();
// will call controler function
router.post(
  '/create-Semester-registration',
  validateRequest(
    SemesterRegistrationValidation.SemesterRegistrationValidationZod,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

//  crteate router for get all data(step-3)
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);

//  create router for get single data(step-3)
router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

//delete a single data
// router.delete('/:studentId', StudentControllers.deleteSingleStudent);

// update a single data
router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationZod,
  ),
  SemesterRegistrationControllers.updateSingleSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
