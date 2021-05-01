import mongoose from 'mongoose';

export type ClientDocument = mongoose.Document & {
  initials: string;
  dob: Date;
  allergies: AllergyList[];
  // charts: [Chart.schema]
};

export type AllergyList = {
  name: string
};

const clientSchema = new mongoose.Schema<ClientDocument>({
  initials: {
    type: String,
    unique: true
  },
  dob: Date,
  allergies: Array
});

export const Client = mongoose.model<ClientDocument>('Client', clientSchema);