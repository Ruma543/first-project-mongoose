import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemister } from '../academicSemister/academicS.model';
import { TSemesterRegistration } from './semesterR.interface';
import { SemesterRegistration } from './semesterR.model';
import QueryBuilder from '../../builder/queryBuilder';
import { RegistrationStatus } from './semesterR.const';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  //check if exist or not
  const academicSemester = payload?.academicSemester;
  //kono semester upcoming or ongoing thakle new ekta create korte dibo na
  const isThereAnyUpcomingOrOngoing = await SemesterRegistration.findOne({
    $or: [{ status: 'Upcoming' }, { status: 'Ongoing' }],
  });
  if (isThereAnyUpcomingOrOngoing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already have an ${isThereAnyUpcomingOrOngoing.status} semester`,
    );
  }
  //step:1:ei semester already registered hoyeche kina
  // const isSemesterRegistrationExist =
  //   await SemesterRegistration.findOne(academicSemester);
  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(academicSemester); //check this semester is already registered or not for avoiding duplicate
  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'this academic semester is already registered',
    );
  }
  //step:2:ei semester ta academic semester e ache kina
  const isAcademicSemesterExist =
    await AcademicSemister.findById(academicSemester); //check this academic semester is exist in academic semester collection
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'this academic semester is not exist',
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getSingleSemesterRegistrationIntoDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const getAllSemesterRegistrationIntoDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'), //populate er field ta interface theke ante hobe
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //check requested semester is exist in the databage?
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id); //check this semester registration is exist in semester registration collection
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'this Semester is not registered');
  }
  //if requested semesters status is ended then no need to update
  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  const requestedStatus = payload?.status;
  if (currentSemesterStatus === 'Ended') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `this semester is already ${currentSemesterStatus}`,
    );
  }
  //upcoming-->ongoing-->ended
  if (
    currentSemesterStatus === RegistrationStatus.Upcoming &&
    requestedStatus === RegistrationStatus.Ended
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change the status directly ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  if (
    currentSemesterStatus === RegistrationStatus.Ongoing &&
    requestedStatus === RegistrationStatus.Upcoming
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change the status directly ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationIntoDB,
  updateSemesterRegistrationIntoDB,
};
