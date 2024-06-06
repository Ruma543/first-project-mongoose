import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { AcademicDepartmentControllers } from './academicD.controllers';
import { AcademicDepartmentValidation } from './academicD.validation';
const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidation.AcademicDepartmentValidationSchemaZod,
  // ),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.UpdateAcademicDepartmentValidationSchemaZod,
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
