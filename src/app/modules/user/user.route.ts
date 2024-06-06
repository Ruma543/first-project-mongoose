import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controllers';
import { AnyZodObject } from 'zod';
import { StudentValidation } from '../student/student.zodvalidation';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/facilty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';

const router = express.Router();

// will call controler function
router.post(
  '/create-student',
  validateRequest(StudentValidation.createStudentValidationSchemaZod),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
export const UserRoutes = router;
