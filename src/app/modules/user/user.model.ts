import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  console.log(this, 'pre hook:we will save data');
  //hashing password and save in the db
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  // if (this.isModified('password')) {
  //   this.password = await bcrypt.hash(
  //     this.password,
  //     Number(config.bcrypt_salt_rounds),
  //   );
  // }
  next();
});
//post save middleware/hooke
userSchema.post('save', function (doc, next) {
  // console.log(this, 'post hook:we will post data');
  doc.password = ''; //after save the data not show the password in the db
  next();
});
export const User = model<TUser>('User', userSchema);
