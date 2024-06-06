import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterR.model';
import { TOfferedCourse } from './offeredC.interface';
import { OfferedCourse } from './offeredC.model';
import { AcademicFaculty } from '../academicFaculty/academicF.model';
import { AcademicDepartment } from '../academicDepartment/academicD.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { hasTimeConflict } from './offeredC.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  //check existance
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'semesterRegistration is not found',
    );
  }
  const academicSemester = isSemesterRegistrationExists.academicSemester;
  //
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department is not found',
    );
  }

  //
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is not found');
  }
  //
  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found');
  }
  //
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found');
  }
  //ei academic department ei academic faculty te  ache kina
  const isDepartmentBelongsToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  console.log(isDepartmentBelongsToFaculty);
  if (!isDepartmentBelongsToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `this ${isAcademicDepartmentExists.name} is not belongs to this ${isAcademicFacultyExists.name}`,
    );
  }

  // same offered course ta next time  nibe na
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({ semesterRegistration, course, section });
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `this offered course with same section is already exist`,
    );
  }
  //check the faculty can not take multiple class
  //step-1:old schedule
  const assignedSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  // console.log(assignedSchedule);
  //step-2:new schedule
  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  // assignedSchedule.forEach((schedule) => {
  //   console.log('schedule', schedule);
  //   const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
  //   const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
  //   const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
  //   const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
  //   // console.log('time', {
  //   //   existingEndTime,
  //   //   existingStartTime,
  //   //   newStartTime,
  //   //   newEndTime,
  //   // });
  //   if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
  //     console.log('me', hasTimeConflict(assignedSchedule, newSchedule));
  //     throw new AppError(
  //       httpStatus.CONFLICT,
  //       `this faculties is not available at this time`,
  //     );
  //   }
  // });
  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `this faculties is not available at this time`,
    );
  }
  // console.log('me', hasTimeConflict(assignedSchedule, newSchedule));
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
  // return null;
};

const getSingleOfferedCourseIntoDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const getAllOfferedCourseIntoDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};
const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  //
  const isOfferCourseExist = await OfferedCourse.findById(id);
  if (!isOfferCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, `this  course is not found`);
  }
  //
  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, `this Faculty is not found`);
  }
  //
  const semesterRegistration = isOfferCourseExist.semesterRegistration;
  //
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);
  if (semesterRegistrationStatus?.status !== 'Upcoming') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `You can not update this data its status is ${semesterRegistrationStatus?.status}`,
    );
  }
  //
  const assignedSchedule = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');
  // console.log(assignedSchedule);
  //step-2:new schedule
  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedSchedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `this faculties is not available at this time`,
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseIntoDB,
  getSingleOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
};
