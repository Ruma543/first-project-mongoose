import Joi from 'joi';

//install joi validator using(npm i joi) (step-1)
// create a schema validation using joi(step-2)
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/, 'capitalized form')
    .required()
    .messages({
      'string.empty': 'must provide the first name',
      'string.max': 'first name not more than 20 characters',
      'string.pattern.name': '{#label} is not capitalized format',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string().trim().required().messages({
    'string.empty': 'must provide the last name',
  }),
});

// Guardian Joi Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  mothersName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// LocalGuardian Joi Schema
const localguardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Student Joi Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{#label} is not valid',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#label} is not valid',
    }),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localguardianValidationSchema.required(),
  profileImg: Joi.string().required(),
  isActive: Joi.string()
    .valid('active', 'inactive')
    .default('active')
    .messages({
      'any.only': '{#label} is not valid',
    }),
});
export default studentValidationSchema;
