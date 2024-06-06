import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterR.const';
import { Types } from 'mongoose';

const objectIdValidator = (val: unknown) => {
  if (!Types.ObjectId.isValid(val)) {
    throw new Error('Invalid ObjectId');
  }
  return val;
};
const SemesterRegistrationValidationZod = z.object({
  body: z.object({
    academicSemester: z.string().refine(objectIdValidator, {
      message: 'Invalid ObjectId',
    }),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

const updateSemesterRegistrationValidationZod = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});
export const SemesterRegistrationValidation = {
  SemesterRegistrationValidationZod,
  updateSemesterRegistrationValidationZod,
};
