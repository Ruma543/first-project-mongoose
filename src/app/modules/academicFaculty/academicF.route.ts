import express from 'express';
import { AcademicFacultyControllers } from './academicF.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicF.validation';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.AcademicFacultyValidationSchemaZod),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.UpdateAcademicFacultyValidationSchemaZod,
  ),
  AcademicFacultyControllers.updateSingleAcademicFaculties,
);

export const AcademicFacultyRoutes = router;
