import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { ClientDocument, clientSchema } from './Client';

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  username: string;
  clients: ClientDocument[];
  comparePassword: comparePasswordFunction;
};

// differing from microsoft starter, must add this: UserDocument param to type as first arg
// otherwise throws err => 'this' implicitly has type 'any' because it does not have a type annotation.ts(2683)
type comparePasswordFunction = (this: UserDocument, passwordAttempt: string, cb: (err: any, isMatch: any) => void) => void;

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  username: String,
  clients: {
    type: [clientSchema],
    required: false
  }
}, { timestamps: true });

// Middleware to hash passwords
userSchema.pre('save', function save(next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) return next();
  const saltRounds = 10;
  const password = user.password;
  bcrypt.hash(password, saltRounds, function (err: mongoose.Error, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

const comparePassword: comparePasswordFunction = function (passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>('User', userSchema);