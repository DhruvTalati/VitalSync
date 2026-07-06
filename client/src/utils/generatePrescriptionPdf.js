import { jsPDF } from 'jspdf';

export const generatePrescriptionPdf = (prescription, patientName) => {
  const doc = new jsPDF();
  const marginX = 20;
  let y = 20;

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('VitalSync', marginX, y);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Health Management System', marginX, y + 6);

  y += 20;
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('PRESCRIPTION REPORT', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Date: ${new Date(prescription.issuedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`, 150, y);

  y += 12;
  doc.setFont('helvetica', 'bold');
  doc.text('Physician', marginX, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.text(`Dr. ${prescription.doctorName}`, marginX, y);
  y += 5;
  doc.text(prescription.specialization || '', marginX, y);

  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Patient', marginX, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.text(patientName || '', marginX, y);

  y += 12;
  doc.setFont('helvetica', 'bold');
  doc.text('DIAGNOSIS', marginX, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.text(prescription.title, marginX, y);

  y += 12;
  doc.setFont('helvetica', 'bold');
  doc.text('PRESCRIPTION', marginX, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  const medicationLines = doc.splitTextToSize(prescription.medication, 170);
  doc.text(medicationLines, marginX, y);
  y += medicationLines.length * 5 + 8;

  doc.setFont('helvetica', 'bold');
  doc.text('DOCTOR NOTES', marginX, y);
  y += 6;
  doc.setFont('helvetica', 'normal');
  const noteLines = doc.splitTextToSize(prescription.doctorNotes || 'No additional notes', 170);
  doc.text(noteLines, marginX, y);
  y += noteLines.length * 5 + 15;

  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text('This is a computer-generated prescription from VitalSync Health Management System.', marginX, y);
  y += 5;
  doc.text('Please follow all medication instructions carefully and consult your doctor for any concerns.', marginX, y);
  y += 5;
  doc.text(`Generated: ${new Date().toLocaleString('en-GB')}`, marginX, y);

  doc.save(`VitalSync_Prescription_${new Date(prescription.issuedDate).toISOString().slice(0, 10)}.pdf`);
};