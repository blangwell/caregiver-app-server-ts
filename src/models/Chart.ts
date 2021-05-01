import mongoose from 'mongoose';

export type ChartDocument = mongoose.Document & {
  date: Date;
  sleep: number;
  fluidIntake: number;
  pain: number;
  foodWater: FoodWaterDocument[];
  hygiene: HygieneDocument[];
  mobility: MobilityDocument[];
  toileting: ToiletingDocument[];
  notes: string;
};

export type FoodWaterDocument = mongoose.Document & {
  fluidIntake: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  notes: string;
};

export type HygieneDocument = mongoose.Document & {
  shower: boolean;
  bath: boolean;
  bedBath: boolean;
  periCare: boolean;
  oralCare: boolean;
  shave: boolean
};

export type MobilityDocument = mongoose.Document & {
  transfer: boolean;
  ambulate: boolean;
  walker: boolean;
  wheelchair: boolean;
}

export type ToiletingDocument = mongoose.Document & {
  incontinent: boolean;
  urineOutput: number;
  bm: boolean;
  bmSize: string;
  bmLoose: boolean;
  bmMucous: boolean;
  bmBloody: boolean;
  notes: string;
};

const chartSchema = new mongoose.Schema<ChartDocument>({
  date: {
    type: String,
    required: true
  },
  sleep: Number,
  fluidIntake: Number,
  pain: Number,
  foodWater: [{
    fluidIntake: Number,
    breakfast: Boolean,
    lunch: Boolean,
    dinner: Boolean,
    notes: String
  }],
  hygiene: [{
    shower: Boolean,
    bath: Boolean,
    bedBath: Boolean,
    periCare: Boolean,
    oralCare: Boolean,
    shave: Boolean
  }],
  mobility: [{
    transfer: Boolean,
    ambulate: Boolean,
    walker: Boolean,
    wheelchair: Boolean
  }],
  toileting: [{
    incontinent: Boolean,
    urineOutput: Number,
    bm: Boolean,
    bmSize: String,
    bmLoose: Boolean,
    bmMucous: Boolean,
    bmBloody: Boolean,
    notes: String
  }],
  notes: String,
}, { timestamps: true });

const FoodWaterSchema = new mongoose.Schema<FoodWaterDocument>({
  fluidIntake: Number,
  breakfast: Boolean,
  lunch: Boolean,
  dinner: Boolean,
  notes: String
});

export const Chart = mongoose.model<ChartDocument>('Chart', chartSchema);