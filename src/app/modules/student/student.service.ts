import { StudentModel } from '../student.model';
import { Student } from './student.interface';
// create student data request(step-1)
const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
// create get all data request(step-1)
const getAllStudentDataFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
// create get single data request(step-1)
const getSingleStudentDataFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};
export const StudentService = {
  createStudentIntoDB,
  getAllStudentDataFromDB,
  getSingleStudentDataFromDB,
};
