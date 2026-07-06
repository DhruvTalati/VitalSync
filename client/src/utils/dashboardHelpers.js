export const buildBudgetData = (transactions = []) => {
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const grouped = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const key = monthLabels[date.getMonth()];
    if (!grouped[key]) grouped[key] = { month: key, fundsAdded: 0, medicalExpenses: 0 };
    if (tx.type === 'credit') grouped[key].fundsAdded += tx.amount;
    else grouped[key].medicalExpenses += tx.amount;
  });

  return monthLabels.map((m) => grouped[m] || { month: m, fundsAdded: 0, medicalExpenses: 0 });
};

export const buildVitalsTrendData = (vitals = []) => {
  return [...vitals]
    .reverse()
    .map((v) => ({
      date: new Date(v.recordedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      heartRate: v.heartRate,
      oxygenLevel: v.oxygenLevel,
      temperature: v.temperature
    }));
};

export const buildHealthTrendData = (vitals = []) => {
  return [...vitals]
    .slice(0, 7)
    .reverse()
    .map((v) => ({
      date: new Date(v.recordedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      heartRate: v.heartRate,
      oxygenLevel: v.oxygenLevel
    }));
};

export const computeRiskScore = (vitals = []) => {
  if (!vitals.length) return { score: 0, level: 'LOW' };
  const latest = vitals[0];
  let score = 0;
  if (latest.heartRate > 100 || latest.heartRate < 60) score += 3;
  if (latest.oxygenLevel < 95) score += 3;
  if (latest.temperature > 37.5 || latest.temperature < 36.1) score += 2;
  if (latest.bloodPressureSystolic > 130 || latest.bloodPressureDiastolic > 85) score += 1;
  const level = score >= 6 ? 'HIGH' : score >= 3 ? 'MODERATE' : 'LOW';
  return { score, level };
};

export const buildRiskTrend = (vitals = []) => {
  return [...vitals]
    .slice(0, 7)
    .reverse()
    .map((v) => {
      const { score } = computeRiskScore([v]);
      return { date: new Date(v.recordedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), score };
    });
};

export const buildRecentActivity = ({ appointments = [], vitals = [], records = [] }) => {
  const activity = [
    ...appointments.map((a) => ({
      type: 'appointment',
      text: `${a.status.charAt(0).toUpperCase() + a.status.slice(1)} appt with ${a.doctorName}`,
      date: new Date(a.appointmentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: new Date(a.appointmentDate).getTime()
    })),
    ...vitals.map((v) => ({
      type: 'vital',
      text: `Vitals logged — HR ${v.heartRate} bpm`,
      date: new Date(v.recordedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: new Date(v.recordedAt).getTime()
    })),
    ...records.map((r) => ({
      type: 'record',
      text: `Medical record: ${r.diagnosis}`,
      date: new Date(r.recordDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: new Date(r.recordDate).getTime()
    }))
  ];

  return activity.sort((a, b) => b.timestamp - a.timestamp).slice(0, 8);
};