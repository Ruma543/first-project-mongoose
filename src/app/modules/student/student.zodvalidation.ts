import { z } from 'zod';

// UserName Zod Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'first name not more than 20 characters' })
    .regex(/^[A-Z][a-z]*$/, {
      message: 'First name is not in capitalized format',
    }),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim(),
});

// Guardian Zod Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: 'fatherName is required' }),
  fatherOccupation: z
    .string()
    .nonempty({ message: 'fatherOccupation is required' }),
  fatherContactNo: z
    .string()
    .nonempty({ message: 'fatherContactNo is required' }),
  mothersName: z.string().nonempty({ message: 'mothersName is required' }),
  motherOccupation: z
    .string()
    .nonempty({ message: 'motherOccupation is required' }),
  motherContactNo: z
    .string()
    .nonempty({ message: 'motherContactNo is required' }),
});

// LocalGuardian Zod Schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: 'name is required' }),
  occupation: z.string().nonempty({ message: 'occupation is required' }),
  contactNo: z.string().nonempty({ message: 'contactNo is required' }),
  address: z.string().nonempty({ message: 'address is required' }),
});

// Student Zod Schema
const createStudentValidationSchemaZod = z.object({
  body: z.object({
    // id: z.string(),
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email format' }),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string(),
      // isActive: z.enum(['active', 'inactive']).default('active'),
      // isDeleted: z.boolean(),
      isOk: z.string(),
    }),
  }),
});

//for update

const UpdateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'first name not more than 20 characters' })
    .regex(/^[A-Z][a-z]*$/, {
      message: 'First name is not in capitalized format',
    })
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

// Guardian Zod Schema
const updateGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .nonempty({ message: 'fatherName is required' })
    .optional(),
  fatherOccupation: z
    .string()
    .nonempty({ message: 'fatherOccupation is required' })
    .optional(),
  fatherContactNo: z
    .string()
    .nonempty({ message: 'fatherContactNo is required' })
    .optional(),
  mothersName: z
    .string()
    .nonempty({ message: 'mothersName is required' })
    .optional(),
  motherOccupation: z
    .string()
    .nonempty({ message: 'motherOccupation is required' })
    .optional(),
  motherContactNo: z
    .string()
    .nonempty({ message: 'motherContactNo is required' })
    .optional(),
});

// LocalGuardian Zod Schema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: 'name is required' }).optional(),
  occupation: z
    .string()
    .nonempty({ message: 'occupation is required' })
    .optional(),
  contactNo: z
    .string()
    .nonempty({ message: 'contactNo is required' })
    .optional(),
  address: z.string().nonempty({ message: 'address is required' }).optional(),
});

const updateStudentValidationSchemaZod = z.object({
  body: z.object({
    student: z
      .object({
        name: UpdateUserNameValidationSchema.optional(),
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email({ message: 'Invalid email format' }).optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: updateGuardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        profileImg: z.string().optional(),
        // isActive: z.enum(['active', 'inactive']).default('active').optional(),
        // isDeleted: z.boolean().optional(),
        isOk: z.string().optional(),
      })
      .optional(),
  }),
});

// Example usage:
// const validationResult = studentSchema.safeParse(studentData);
// if (!validationResult.success) {
//   console.error(validationResult.error.errors);
// }

export const StudentValidation = {
  createStudentValidationSchemaZod,
  updateStudentValidationSchemaZod,
};
