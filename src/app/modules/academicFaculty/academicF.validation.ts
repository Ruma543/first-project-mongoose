import { z } from 'zod';
const AcademicFacultyValidationSchemaZod = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be string',
    }),
  }),
});

const UpdateAcademicFacultyValidationSchemaZod = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Faculty must be string',
      })
      .optional(),
  }),
});
export const AcademicFacultyValidation = {
  AcademicFacultyValidationSchemaZod,
  UpdateAcademicFacultyValidationSchemaZod,
};
