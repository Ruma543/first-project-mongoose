import mongoose from 'mongoose';
import { Student } from '../student.model';
import { TStudent } from './student.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/queryBuilder';
import { studentSearchField } from './students.const';
// create student data request(step-1)
// const createStudentIntoDB = async (studentData: TStudent) => {
//   // for static
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error('user already exist!');
//   }
//   // result eita upore dile id er error ta dibe r niche dile user already exist  ei error ta dibe'
//   const result = await Student.create(studentData); //built in static method
//   //built in instance method
//   // const student = new Student(studentData);

//   // if (await student.isUserExists(studentData.id)) {
//   //   throw new Error('user already exist!');
//   // }
//   // const result = await student.save();
//   return result;
// };
// create get all data request(step-1)
const getAllStudentDataFromDB = async (query: Record<string, unknown>) => {
  //http://localhost:5000/api/v1/students?page=1&limit=2 //pagination and limit
  // const queryObj = { ...query };

  // const studentSearchField = ['email', 'name.firstName', 'presentAddress'];
  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  //filtering
  // const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeField.forEach((el) => delete queryObj[el]);

  // console.log('base query', { query }, { queryObj });

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);
  //for field limiting limit query theke await ta bad dite hobe and last e use korte hobe  http://localhost:5000/api/v1/students?fields=name,email
  // let fields = '-__v';
  //from : fields: 'name,email'
  //to: fields: 'name email'
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  //   console.log({ fields });
  // }

  // const fieldQuery = await limitQuery.select(fields);
  // return fieldQuery;
  //http://localhost:5000/api/v1/students?fields=-name jodi name field ta bad diye baki sob dekhte cai

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};
// create get single data request(step-1)
const getSingleStudentDataFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  //use find one because of find with custom id
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  //use aggrigate to find single data
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
//delete a single data
const deleteSingleStudentDataFromDB = async (id: string) => {
  // check the student isExists which i want to delete
  const isStudentExists = await Student.findOne({ id });
  if (!isStudentExists) {
    throw new Error('this student is not exist');
  }

  //use transaction to delete user and student at a time
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //findOneAndUpdate ta use korbo cos custom id ta use kore delet korbo, findById use korle _id ta hoye jabe
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('failed to delete user');
  }
};
//update a single data
const updateSingleStudentDataFromDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  //update non primitive data
  //step-1
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  //step-2
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  //step-3
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  console.log(modifiedUpdatedData);
  //step-4
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentService = {
  // createStudentIntoDB,
  getAllStudentDataFromDB,
  getSingleStudentDataFromDB,
  deleteSingleStudentDataFromDB,
  updateSingleStudentDataFromDB,
};
