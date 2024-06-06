import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.zodvalidation';

const router = express.Router();
// will call controler function
// router.post('/create-student', StudentControllers.createStudent);

// cteate router for get all data(step-3)
router.get('/', StudentControllers.getAllStudent);

// create router for get single data(step-3)
router.get('/:studentId', StudentControllers.getSingleStudent);

//delete a single data
router.delete('/:studentId', StudentControllers.deleteSingleStudent);

//update a single data
router.patch(
  '/:studentId',
  validateRequest(StudentValidation.updateStudentValidationSchemaZod),
  StudentControllers.updateSingleStudent,
);
// router.put('/:studentId', StudentControllers.updateSingleStudent);

export const StudentRoutes = router;
