import mongoose from "mongoose";
import dotenv from "dotenv";
import Bed from "../models/Bed.js";
import BloodInventory from "../models/BloodInventory.js";

dotenv.config();

const beds = [
  { bedNumber: "E1", ward: "Emergency" },
  { bedNumber: "E2", ward: "Emergency" },
  { bedNumber: "E3", ward: "Emergency" },
  { bedNumber: "G1", ward: "General" },
  { bedNumber: "G2", ward: "General" },
  { bedNumber: "G3", ward: "General" },
  { bedNumber: "I1", ward: "ICU" },
  { bedNumber: "I2", ward: "ICU" },
  { bedNumber: "I3", ward: "ICU" },
];

const bloodInventory = [
  { bloodGroup: "A+", units: 10 },
  { bloodGroup: "A-", units: 22 },
  { bloodGroup: "AB+", units: 22 },
  { bloodGroup: "AB-", units: 20 },
  { bloodGroup: "B+", units: 29 },
  { bloodGroup: "B-", units: 22 },
  { bloodGroup: "O+", units: 31 },
  { bloodGroup: "O-", units: 15 },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Bed.deleteMany();
  await BloodInventory.deleteMany();
  await Bed.insertMany(beds);
  await BloodInventory.insertMany(bloodInventory);
  console.log("Beds and blood inventory seeded successfully");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
