import { z } from 'zod';
const AcademicDepartmentValidationSchemaZod = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'faculty is required',
    }),
  }),
});

const UpdateAcademicDepartmentValidationSchemaZod = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department must be string',
        required_error: 'Name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Department must be string',
        required_error: 'Faculties is required',
      })
      .optional(),
  }),
});
export const AcademicDepartmentValidation = {
  AcademicDepartmentValidationSchemaZod,
  UpdateAcademicDepartmentValidationSchemaZod,
};
