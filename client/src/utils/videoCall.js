export const generateRoomName = (appointmentId) => {
  const suffix = appointmentId
    ? appointmentId.slice(-4)
    : Math.floor(Math.random() * 9000 + 1000);
  const middle = Math.floor(Math.random() * 900 + 100);
  return `VitalSync-Session-${middle}-${suffix}`;
};

export const buildJitsiUrl = (roomName) => `https://meet.jit.si/${roomName}`;
