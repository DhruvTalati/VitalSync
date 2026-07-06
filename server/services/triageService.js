const EMERGENCY_KEYWORDS = ['chest pain', 'severe', 'difficulty breathing', 'unconscious', 'bleeding', 'seizure'];

export const triagePriority = (symptoms = '') => {
  const lower = symptoms.toLowerCase();
  const isEmergency = EMERGENCY_KEYWORDS.some((keyword) => lower.includes(keyword));
  return isEmergency ? 'high' : 'normal';
};

export const generateToken = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 900) + 100);
  return `VS-${y}${m}${d}-${random}`;
};