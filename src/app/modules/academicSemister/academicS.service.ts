import TAcademicSemister from './academicS.interface';
import { AcademicSemister } from './academicS.model';
import { academicSemisterCodeMapper } from './academicSemisterConst';

const createAcademicSemisterIntoDB = async (payload: TAcademicSemister) => {
  //semester name er sathe code ta match kore dekhbe, na mille tobe error dibe

  if (academicSemisterCodeMapper[payload.name] !== payload.code) {
    throw new Error('invalid semister code');
  }
  const result = await AcademicSemister.create(payload);
  return result;
};

const getSingleAcademicSemisterIntoDB = async (id: string) => {
  const result = await AcademicSemister.findById(id);
  return result;
};

const getAllAcademicSemisterIntoDB = async () => {
  const result = await AcademicSemister.find();
  return result;
};
const updateAcademicSemisterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemister>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemisterCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('invalid semister code');
  }
  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemisterService = {
  createAcademicSemisterIntoDB,
  getSingleAcademicSemisterIntoDB,
  getAllAcademicSemisterIntoDB,
  updateAcademicSemisterIntoDB,
};
