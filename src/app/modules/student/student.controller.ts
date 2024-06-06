import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentService } from './student.service';

import studentValidationSchemaZod from './student.zodvalidation';
import sendResponse from '../../utils/sendResponce';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

//make a higher order function for using all controller
// const catchAsync = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//   };
// };

// get all student and pass for next use in route(step-2)
const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  // try {

  const result = await StudentService.getAllStudentDataFromDB(req.query);
  // res.status(200).json({
  //   success: true,
  //   message: 'All student data get successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All student data get successfully',
    data: result,
  });
  // } catch (err) {
  //   next(err);
  // console.log(err);
  // res.status(500).json({
  //   success: false,
  //   message: err.message || 'something went wrong',
  //   data: err,
  // });
  // }
});
// get single student and pass for next use in route(step-2)
const getSingleStudent = catchAsync(async (req, res) => {
  // try {
  const { studentId } = req.params;
  const result = await StudentService.getSingleStudentDataFromDB(studentId);
  // res.status(200).json({
  //   success: true,
  //   message: 'single student data get successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single student data get successfully',
    data: result,
  });
  // } catch (err) {
  //   next(err);
  // res.status(500).json({
  //   success: false,
  //   message: err.message || 'something went wrong',
  //   data: err,
  // });
  // }
});

//delete a single data
const deleteSingleStudent = catchAsync(async (req, res) => {
  // try {
  const { studentId } = req.params;
  const result = await StudentService.deleteSingleStudentDataFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data delete successfully',
    data: result,
  });
  // res.status(200).json({
  //   success: true,
  //   message: 'student data delete successfully',
  //   data: result,
  // });
  // } catch (err) {
  //   next(err);
  // console.log(err);
  // res.status(500).json({
  //   success: false,
  //   message: err.message || 'something went wrong',
  //   data: err,
  // });
  // }
});
//update a single data
const updateSingleStudent = catchAsync(async (req, res) => {
  // try {
  const { studentId } = req.params;
  const { student } = req.body;
  // const isOk = req.body.isOk;
  const result = await StudentService.updateSingleStudentDataFromDB(
    studentId,
    student,
  );
  // if (result.modifiedCount === 0) {
  //   return res.status(404).json({
  //     success: false,
  //     message: 'Student not found or no changes made',
  //   });
  // }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' student data update  successfully',
    data: result,
  });
  // res.status(200).json({
  //   success: true,
  //   message: ' student data update  successfully',
  //   data: result,
  // });
  // } catch (err) {
  //   next(err);
  // console.log(err);
  // res.status(500).json({
  //   success: false,
  //   message: err.message || 'something went wrong',
  //   data: err,
  // });
  // }
});
// export must otherwise no use in the route
export const StudentControllers = {
  // createStudent,
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
