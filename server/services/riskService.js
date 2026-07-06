export const computeRiskScore = (vital) => {
  if (!vital) return { score: 0, level: 'Low' };
  let score = 0;
  if (vital.heartRate > 100 || vital.heartRate < 60) score += 3;
  if (vital.oxygenLevel < 95) score += 3;
  if (vital.temperature > 37.5 || vital.temperature < 36.1) score += 2;
  if (vital.bloodPressureSystolic > 130 || vital.bloodPressureDiastolic > 85) score += 1;
  const level = score >= 6 ? 'High' : score >= 3 ? 'Moderate' : 'Low';
  return { score, level };
};

export const isAbnormal = (vital) => {
  return (
    vital.heartRate > 100 ||
    vital.heartRate < 60 ||
    vital.oxygenLevel < 95 ||
    vital.temperature > 37.5 ||
    vital.temperature < 36.1
  );
};