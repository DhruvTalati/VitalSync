import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema(
  {
    bedNumber: {
      type: String,
      required: true,
      unique: true
    },
    ward: {
      type: String,
      enum: ['Emergency', 'General', 'ICU'],
      required: true
    },
    status: {
      type: String,
      enum: ['Available', 'Occupied'],
      default: 'Available'
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  { timestamps: true }
);

const Bed = mongoose.model('Bed', bedSchema);

export default Bed;