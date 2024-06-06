import express from 'express';
import { AcademicSemisterControllers } from './academicS.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicValidation } from './academicS.validation';

const router = express.Router();
// will call controler function
router.post(
  '/create-academic-semister',
  validateRequest(AcademicValidation.academicSemisterValidationZod),
  AcademicSemisterControllers.createAcademicSemister,
);

//  cteate router for get all data(step-3)
router.get('/', AcademicSemisterControllers.getAllAcademicSemester);

//  create router for get single data(step-3)
router.get(
  '/:semesterId',
  AcademicSemisterControllers.getSingleAcademicSemister,
);

//delete a single data
// router.delete('/:studentId', StudentControllers.deleteSingleStudent);

// update a single data
router.patch(
  '/:semesterId',
  validateRequest(AcademicValidation.updateAcademicSemisterValidationZod),
  AcademicSemisterControllers.updateSingleAcademicSemister,
);

export const AcademicRoutes = router;
