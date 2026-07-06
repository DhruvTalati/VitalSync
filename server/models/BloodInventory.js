import mongoose from 'mongoose';

const bloodInventorySchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
      unique: true
    },
    units: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const BloodInventory = mongoose.model('BloodInventory', bloodInventorySchema);

export default BloodInventory;