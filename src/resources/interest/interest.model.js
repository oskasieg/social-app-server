import mongoose from 'mongoose';

//zainteresowania recznie dodane do mongoDB!

const interestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Interest = mongoose.model('interest', interestSchema);
