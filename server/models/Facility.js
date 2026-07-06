import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['hospital', 'clinic', 'pharmacy'],
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      default: ''
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      default: 'Anand'
    }
  },
  { timestamps: true }
);

const Facility = mongoose.model('Facility', facilitySchema);

export default Facility;