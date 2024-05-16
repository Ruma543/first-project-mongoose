import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();
// will call controler function
router.post('/create-student', StudentControllers.createStudent);

// cteate router for get all data(step-3)
router.get('/', StudentControllers.getAllStudent);

// create router for get single data(step-3)
router.get('/:studentId', StudentControllers.getSingleStudent);

export const StudentRoutes = router;
