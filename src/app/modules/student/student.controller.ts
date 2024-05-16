import { Request, Response } from 'express';
import { StudentService } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    // data ta student er modhe pathano hoiche postman e thats why req.body.student
    // const student = req.body.student;
    // or { student: studentData } eivabe deya jay
    const { student: studentData } = req.body;

    // will call service func to send this data
    // const result = await StudentService.createStudentIntoDB(student);
    // or studentData pass korte hobe
    const result = await StudentService.createStudentIntoDB(studentData);

    // send responce
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
// get all student and pass for next use in route(step-2)
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentDataFromDB();
    res.status(200).json({
      success: true,
      message: 'All student data get successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
// get single student and pass for next use in route(step-2)
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentDataFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'All student data get successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
// export must otherwise no use in the route
export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
