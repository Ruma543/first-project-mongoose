import mongoose from 'mongoose';
import QueryBuilder from '../../builder/queryBuilder';
import { courseSearchableFields } from './course.const';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseIntoDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourse.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseIntoDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourse.course',
  );
  return result;
};
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  //distracture basic data and preRequisite data
  const { preRequisiteCourse, ...courseRemainingData } = payload;
  //use transaction
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //update basic data
    const updateBasicCourseData = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updateBasicCourseData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
    }
    //check if prerequisite course is available
    console.log(preRequisiteCourse); //update field e je 2 ta dichilam
    //[
    //   { course: '665eb659673715d12ac55aaf', isDeleted: true },
    //   { course: '665eb659673715d12ac55aaf', isDeleted: false }
    // ]
    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      const deletePrerequisite = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted) //isdelete true thakle
        .map((el) => el.course); //map kore just id ta niye asbo
      console.log('prerequisite ache ki', deletePrerequisite); //jeta true seta asbe
      //prerequisite ache ki [ { course: '665eb659673715d12ac55aaf', isDeleted: true } ]
      const deletedPrerequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletePrerequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedPrerequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }
      const newPrerequisite = preRequisiteCourse?.filter(
        (el) => el.course && !el.isDeleted,
      );
      const newPrerequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPrerequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPrerequisiteCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }
    }
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      'preRequisiteCourse.course',
    );
    // console.log({ newPrerequisite });
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
  }
};
const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>[],
) => {
  if (!Array.isArray(payload)) {
    throw new Error('Payload must be an array');
  }
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { course: id, $addToSet: { faculties: { $each: payload } } },
    {
      upsert: true, //new kichu add hobe tai
      new: true,
    },
  );

  return result;
};
const removeFacultiesFromCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>[],
) => {
  if (!Array.isArray(payload)) {
    throw new Error('Payload must be an array');
  }
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { $pull: { faculties: { $in: payload } } },
    {
      new: true,
    },
  );

  return result;
};
export const CourseService = {
  createCourseIntoDB,
  getAllCourseIntoDB,
  getSingleCourseIntoDB,
  updateCourseIntoDB,
  deleteCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseIntoDB,
};
