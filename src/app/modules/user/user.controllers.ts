import { NextFunction, Request, RequestHandler, Response } from 'express';
// import studentValidationSchemaZod from '../student/student.zodvalidation';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponce';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  // try {
  //install joi validator using(npm i zod) (step-1)
  // create a schema validation using zod(step-2)
  // studentValidationSchemaZod = z.object({
  //   id: z.string(),
  //   name: z.object({
  //     firstName: z
  //       .string()
  //       .max(20, { message: 'first name not more then 20 characters' }),
  //     middleName: z.string().max(20),
  //     lastName: z
  //       .string()
  //       .max(20, { message: 'last name not more then 20 characters' }),
  //   }),
  // });

  // Example usage:
  // const validationResult = studentSchema.validate(studentData);
  // data ta student er modhe pathano hoiche postman e thats why req.body.student
  // const student = req.body.student;
  // or { student: studentData } eivabe deya jay

  const { password, student: studentData } = req.body;
  console.log(req.body);
  // joi validator using(step-3)
  // const { error, value } = studentValidationSchema.validate(studentData);

  // zod validator using(step-3)
  // const zodData = studentValidationSchemaZod.parse(studentData);

  // will call service func to send this data
  // const result = await StudentService.createStudentIntoDB(student);
  // or studentData pass korte hobe
  // value ta pass korte hobe , value means student data
  // const result = await StudentService.createStudentIntoDB(studentData);
  const result = await UserService.createStudentIntoDB(password, studentData);

  // this error handle for joi(step-4)
  // if (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: 'something went wrong',
  //     error: error.details,
  //   });
  // }

  // console.log({ error }, { value });

  // send responce
  // res.status(200).json({
  //   success: true,
  //   message: 'student is created successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully in',
    data: result,
  });
  // } catch (err) {
  //   next(err);
  //   // console.log(err);
  //   // res.status(500).json({
  //   //   success: false,
  //   //   message: err.message || 'something went wrong',
  //   //   data: err,
  //   // });
  // }
});
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});
export const UserControllers = {
  createStudent,
  createAdmin,
  createFaculty,
};
