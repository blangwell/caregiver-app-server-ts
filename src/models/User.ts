import mongoose from "mongoose";
import { ClientDocument, clientSchema } from './Client';

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  username: string;
  clients: ClientDocument[];
};

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: String,
  clients: [clientSchema]
}, { timestamps: true });

export const User = mongoose.model<UserDocument>('User', userSchema);