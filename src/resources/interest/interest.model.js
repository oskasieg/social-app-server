import mongoose from 'mongoose';

const interestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Interest = mongoose.model('interest', interestSchema);
