import { TAcademicFaculty } from './academicF.interface';
import { AcademicFaculty } from './academicF.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getSingleAcademicFacultyIntoDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const getAllAcademicFacultiesIntoDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const AcademicFacultyService = {
  createAcademicFacultyIntoDB,
  getSingleAcademicFacultyIntoDB,
  getAllAcademicFacultiesIntoDB,
  updateAcademicFacultyIntoDB,
};
