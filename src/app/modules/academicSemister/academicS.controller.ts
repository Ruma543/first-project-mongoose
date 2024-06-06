import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { AcademicSemisterService } from './academicS.service';

const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await AcademicSemisterService.createAcademicSemisterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semister is created succesfully',
    data: result,
  });
});

const getSingleAcademicSemister = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemisterService.getSingleAcademicSemisterIntoDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semister is created succesfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemisterService.getAllAcademicSemisterIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All student data get successfully',
    data: result,
  });
});

const updateSingleAcademicSemister = catchAsync(async (req, res) => {
  // try {
  const { semesterId } = req.params;

  const result = await AcademicSemisterService.updateAcademicSemisterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' student data update  successfully',
    data: result,
  });
});
export const AcademicSemisterControllers = {
  createAcademicSemister,
  getSingleAcademicSemister,
  getAllAcademicSemester,
  updateSingleAcademicSemister,
};
