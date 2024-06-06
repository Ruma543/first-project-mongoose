import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TAcademicDepartment } from './academicD.interface';
import { AcademicDepartment } from './academicD.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  //check  this department name is exist
  const isExists = await AcademicDepartment.findOne({ name: payload.name });
  if (isExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'this department is already exist',
    );
  }
  //if not then create the department
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getSingleAcademicDepartmentIntoDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

const getAllAcademicDepartmentsIntoDB = async () => {
  //use populate for see the referencing academicFaculty data
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  // Check if the department exists
  const isDepartmentExist = await AcademicDepartment.findById(id);

  if (!isDepartmentExist) {
    //create AppError inside errors to handle error status code
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Department is not exist.',
    );
  }

  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};
export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsIntoDB,
  getSingleAcademicDepartmentIntoDB,
  updateAcademicDepartmentIntoDB,
};
