import asyncHandler from '../utils/asyncHandler.js';
import Facility from '../models/Facility.js';

export const getFacilities = asyncHandler(async (req, res) => {
  const { type } = req.query;
  const filter = type && type !== 'all' ? { type } : {};
  const facilities = await Facility.find(filter);
  res.status(200).json({ success: true, count: facilities.length, facilities });
});