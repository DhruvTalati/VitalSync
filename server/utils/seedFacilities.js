import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Facility from '../models/Facility.js';

dotenv.config();

const facilities = [
  { name: 'Anand Orthopaedic Centre', type: 'clinic', address: 'Triveni Road, Anand', phone: '02692-248000', latitude: 22.5645, longitude: 72.9289 },
  { name: 'Apollo Clinic Anand', type: 'clinic', address: 'MG Road, Near Town Hall, Anand', phone: '1800-180-1061', latitude: 22.5580, longitude: 72.9310 },
  { name: 'Civil Hospital Nadiad', type: 'hospital', address: 'Station Road, Nadiad', phone: '0268-2562111', latitude: 22.6939, longitude: 72.8615 },
  { name: 'Dharmsinh Desai Hospital', type: 'hospital', address: 'DDIT Campus, Nadiad', phone: '0268-2520502', latitude: 22.6910, longitude: 72.8660 },
  { name: 'Sanket India', type: 'hospital', address: 'Anand Vidyanagar Road, Anand', phone: '02692-230000', latitude: 22.5720, longitude: 72.9240 },
  { name: 'Amul Dairy Pharmacy', type: 'pharmacy', address: 'Amul Dairy Road, Anand', phone: '02692-258100', latitude: 22.5510, longitude: 72.9450 }
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Facility.deleteMany();
  await Facility.insertMany(facilities);
  console.log('Facilities seeded successfully');
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});