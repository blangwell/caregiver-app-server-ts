import mongoose from 'mongoose';
import { ChartDocument, chartSchema } from "./Chart";

export type ClientDocument = mongoose.Document & {
  initials: string;
  dob: Date;
  allergies: AllergyList[];
  charts: ChartDocument[];
};

export type AllergyList = {
  name: string
};

export const clientSchema = new mongoose.Schema<ClientDocument>({
  initials: {
    type: String,
    unique: true
  },
  dob: Date,
  allergies: Array,
  charts: [chartSchema]
});