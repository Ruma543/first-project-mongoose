import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './semesterR.interface';
import { SemesterRegistrationStatus } from './semesterR.const';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'AcademicSemister',
  },
  status: {
    type: String,
    enum: SemesterRegistrationStatus,
    default: 'Upcoming',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCredit: {
    type: Number,
    default: 3,
  },
  maxCredit: {
    type: Number,
    default: 15,
  },
});

export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
