#npm init -y #npm install express #npm install mongoose --save #npm install
typescript --save-dev #npm i cors #npm i dotenv #tsc -init #npm run build #npm i
--save-dev @types/node #npm i --save-dev @types/express #npm i --save-dev
@types/cors #npm install eslint @typescript-eslint/parser
@typescript-eslint/eslint-plugin --save-dev #npx eslint
--init(problem>enter,import/export,....) #to see problem:npx eslint src ./npm
run lint #to fix the problem:npx eslint src --fix/npm run lint:fix
###To solve the js error issue for eslint:1.place this in script inside the pakage.json(
"start:prod": "node ./dist/server.js",
"start:dev": "npx ts-node-dev --respawn --transpile-only src/server.ts",
"build": "tsc",
"lint": "npx eslint src --ignore-pattern .ts",
"lint:fix": "npx eslint src --fix",
"prettier": "prettier --ignore-path .gitignore --write \"./src/\*_/_.+(js|ts|json)\"",
"prettier:fix": "npx prettier --write src",
"test": "echo \"Error: no test specified\" && exit 1"
), 2.place this code inside the eslint.config.mjs(
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
{
ignores: ['**/node_modules/', '.dist/'],
languageOptions: {
globals: {
...globals.browser,
process: 'readonly',
},
},

    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },

},

pluginJs.configs.recommended,
...tseslint.configs.recommended,
];

), 3.place this code inside the seetings in vs code(
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
)
#npm install
--save-dev prettier
#npx prettier --write src/app.ts (kono space gap thakle thik koredeyar kotha)
#npm install --save-dev eslint-config-prettier(pretter and eslint er conflict ta dur korte eita install korte hobe)
##npm run build(for compile js file)
##node ./dist/server.js(to run the project)
#npm i ts-node-dev --save-dev(to solve the again and again command npm run build)
#npx ts-node-dev --respawn --transpile-only src/server.ts(must use npx first, otherwise dont work )
1.prepare interface> //student.interface.ts(

import { Schema, model, connect } from 'mongoose';
export type Guardian = {
fatherName: string;
fatherOccupation: string;
fatherContactNo: string;
mothersName: string;
motherOccupation: string;
motherContactNo: string;
};
export type UserName = {
firstName: string;
middleName: string;
lastName: string;
};
export type LocalGuardian = {
name: string;
occupation: string;
contactNo: string;
};
export type Student = {
id: string;
name: UserName;
gender: 'male' | 'female';
dateOfBirth: string;
email: string;
contactNo: string;
emergencyContactNo: string;
bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
presentAddress: string;
permanentAddress: string;
guardian: Guardian;
localGuardian: LocalGuardian;
profileImg?: string;
isActive: 'active' | 'inactive';
};

)
##database er sathe compass connect korte: mongodb compass e env er url ta dite hoe>save korte hobe>project er name ta dite hobe> save korte hobe>connect dile project er moddhe collection ta chole asbe

###to use joi validation://install joi validator using(npm i joi) (step-1)
// create a schema validation using joi(step-2)
inside student.validation.ts(import Joi from 'joi';

const userNameValidationSchema = Joi.object({
firstName: Joi.string()
.trim()
.max(20)
.pattern(/^[A-Z][a-z]\*$/, 'capitalized form')
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
export default studentValidationSchema;)
step-3:inside student.controller.ts(
// joi validator(step-3)
const { error, value } = studentValidationSchema.validate(studentData);
const result = await StudentService.createStudentIntoDB(value);
)

### using zod validation:

# 1.install joi validator using(npm i zod) (step-1)

# 2. create a schema validation using zod(step-2)

    (import { z } from 'zod';

// UserName Zod Schema
const userNameValidationSchema = z.object({
firstName: z
.string()
.trim()
.max(20, { message: 'first name not more than 20 characters' })
.regex(/^[A-Z][a-z]\*$/, {
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
const studentValidationSchemaZod = z.object({
id: z.string(),
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
profileImg: z.string(),
isActive: z.enum(['active', 'inactive']).default('active'),
});

// Example usage:
// const validationResult = studentSchema.safeParse(studentData);
// if (!validationResult.success) {
// console.error(validationResult.error.errors);
// }

export default studentValidationSchemaZod;
)

# 3. // zod validator using(step-3)

    const zodData = studentValidationSchemaZod.parse(studentData);
     const result = await StudentService.createStudentIntoDB(zodData);

### instance method:

1. (built in static method):
   const result = await StudentModel.create(studentData);
   return result;
2. built in instance method:
   const student = new StudentModel(studentData);
   const result = await student.save();
   return result;
3. custom instance method:
   #step-1://for custom instance(step-1)
   export type StudentsMethods = {
   isUserExists(id: string): Promise<TStudent | null>;
   };
   //for custom instance(step-2)
   export type StudentModel = Model<
   TStudent,
   Record<string, never>,
   StudentsMethods

   > ;

   #step-2:implementation of custom instance inside student.model.ts
   studentSchema.methods.isUserExists = async function (id: string) {
   const existingUser = await Student.findOne({ id });
   return existingUser;
   };
   #step-3: inside student.service.ts inside createStudentIntoDB
   ( const student = new Student(studentData);

if (await student.isUserExists(studentData.id)) {
throw new Error('user already exist!');
}
const result = await student.save();
return result;)
#step-4:pass 3 parameter inside schema:
const studentSchema = new Schema<TStudent, StudentModel, StudentsMethods>

##static instance method:
1.step-1:
// implement custom static method
studentSchema.statics.isUserExists = async function (id: string) {
const existingUser = await Student.findOne({ id });
return existingUser;
};
2.step-2:two parameter is pass inside schema
const studentSchema = new Schema<TStudent, StudentModel>
// for static
if (await Student.isUserExists(studentData.id)) {
throw new Error('user already exist!');
}
// result eita upore dile id er error ta dibe r niche dile user already exist ei error ta dibe'
const result = await Student.create(studentData); //built in static method

##mongoose middleware:
/middleware inside student.model.ts after studentSchema
step-1: pre save middleware/hook:will work on create() and save()
studentSchema.pre('save', async function (next) {
console.log(this, 'pre hook:we will save data');
//hashing password and save in the db
const user = this;
user.password = await bcrypt.hash(
user.password,
Number(config.bcrypt_salt_rounds),
);
next();
});
step-2:post save middleware/hooke
studentSchema.post('save', function () {
console.log(this, 'post hook:we will post data');
});

### using bcrypt for sequre the password:

step-1: install (npm i bcrypt)+(npm install -D @types/bcrypt)
step-2:BCRYPT_SALT_ROUNDS=number like 12/13/14/others (inside .env file)
step-3: inside export( bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,)(inside the config>index.ts)
step-4:use it inside middleware(
//hashing password and save in the db
const user = this;
user.password = await bcrypt.hash(
user.password,
Number(config.bcrypt_salt_rounds),
);)
Module-11:
npm i http-status //for error handle
