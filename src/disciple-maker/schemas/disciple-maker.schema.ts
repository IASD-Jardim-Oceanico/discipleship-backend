import * as mongoose from 'mongoose';
import { DiscipleMakerRole } from '../entities/disciple-maker.entity';

export const DiscipleMakerSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be 8 character or more'],
    },
    role: { type: String, required: true, enum: DiscipleMakerRole },
    full_name: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true },
);
