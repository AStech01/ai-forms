// import mongoose, { Document, Schema } from 'mongoose';
// import bcrypt from 'bcryptjs';

// export interface IUser extends Document {
//   email: string;
//   password: string;
//   name: string;
//   createdAt: Date;
//   comparePassword(candidatePassword: string): Promise;
// }

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.comparePassword = async function (candidatePassword: string) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model('User', userSchema);

import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // optional: adds createdAt and updatedAt
);

// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hashed = await bcrypt.hash(this.password, 12);
  this.password = hashed;
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
