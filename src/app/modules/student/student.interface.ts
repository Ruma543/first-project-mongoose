import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string; //use small letter string
  fatherOccupation: string;
  fatherContactNo: string;
  mothersName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  profileImg?: string;
  isDeleted: boolean;
  // isActive: 'active' | 'inactive';
  // isDeleted: boolean;
  isOk: string;
};

//for creating static instance
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

//for creating custom instance(step-1)
// export type StudentsMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };
//for custom instance(step-2)
// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentsMethods
// >;
