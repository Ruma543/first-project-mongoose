import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'must provide the first name'],
    trim: true, //to remove unnessary space
    maxlength: [20, 'first name not more then 20 characters'],
    // custom validation
    // validate: {
    //   validator: function (value: String) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} in not capitalized formate',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'must provide the last name'],
  },
});
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  mothersName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'id is required'], unique: true }, //use capital string
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    // password: {
    //   type: String,
    //   required: [true, 'password is required'],
    //   // unique: true,
    //   maxlength: [20, 'password not more then 20 character'],
    // },
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      // right way to use enum
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        // message: "gender value must be 'male', 'female','other'",
        message: '{VALUE} is not valid',
      },
      required: true,
    }, //predefine type value thakle e name type us korte hobe
    dateOfBirth: { type: Date },
    // email: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not valid',
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [true, 'Admission semester id is required'],
      // unique: true,
      ref: 'AcademicSemister',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic department id is required'],
      // unique: true,
      ref: 'AcademicDepartment',
    },
    profileImg: { type: String, required: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    // isActive: {
    //   type: String,
    //   enum: {
    //     values: ['active', 'inactive'],
    //     // message: "isActive value must be 'active', 'inactive' ",
    //     message: '{VALUE} is not valid',
    //   },
    //   default: 'active',
    // },
    // isDeleted: {
    //   type: Boolean,
    //   default: false,
    // },
    isOk: {
      type: String,
      default: 'not ok',
    },
  },
  {
    //to open virtual for add some field
    toJSON: {
      virtuals: true,
    },
  },
);
// mongoose virtual
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName}  ${this?.name?.middleName}  ${this?.name?.lastName}`;
});
//middleware
//pre save middleware/hook:will work on create() and save()
// studentSchema.pre('save', async function (next) {
//   console.log(this, 'pre hook:we will save data');
//   //hashing password and save in the db
//   // const user = this;
//   // user.password = await bcrypt.hash(
//   //   user.password,
//   //   Number(config.bcrypt_salt_rounds),
//   // );
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(
//       this.password,
//       Number(config.bcrypt_salt_rounds),
//     );
//   }
//   next();
// });
// //post save middleware/hooke
// studentSchema.post('save', function (doc, next) {
//   // console.log(this, 'post hook:we will post data');
//   doc.password = ''; //after save the data not show the password in the db
//   next();
// });

//query middleware
studentSchema.pre('find', function (next) {
  // console.log(this, 'this data is here');
  this.find({ isDeleted: { $ne: true } }); //isDeleted true thakle data dibe na
  next();
});
studentSchema.pre('findOne', function (next) {
  // console.log(this, 'this data is here');
  this.find({ isDeleted: { $ne: true } }); //isDeleted true thakle data dibe na
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});
// implement custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
//implementation of custom instance
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
// route ->controller->service->databage e query kore data insert kore dibe
