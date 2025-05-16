import jsPDF from 'jspdf';
import { ResumeAnalysisResult } from '../services/gemini';

export function generatePDFReport(analysis: ResumeAnalysisResult): Blob {
  const doc = new jsPDF();
  let yPos = 20;
  const lineHeight = 7;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;

  // Title
  doc.setFontSize(20);
  doc.text('Resume Analysis Report', pageWidth / 2, yPos, { align: 'center' });
  yPos += lineHeight * 2;

  // Overall Scores
  doc.setFontSize(16);
  doc.text('Overall Scores', margin, yPos);
  yPos += lineHeight;
  doc.setFontSize(12);
  doc.text(`Overall Score: ${analysis.overall}%`, margin, yPos);
  yPos += lineHeight;
  doc.text(`ATS Compatibility Score: ${analysis.atsScore}%`, margin, yPos);
  yPos += lineHeight * 2;

  // Strengths
  doc.setFontSize(16);
  doc.text('Key Strengths', margin, yPos);
  yPos += lineHeight;
  doc.setFontSize(12);
  analysis.strengths.forEach((strength: string) => {
    doc.text(`• ${strength}`, margin, yPos);
    yPos += lineHeight;
  });
  yPos += lineHeight;

  // Improvements
  doc.setFontSize(16);
  doc.text('Suggested Improvements', margin, yPos);
  yPos += lineHeight;
  doc.setFontSize(12);
  analysis.improvements.forEach((improvement: string) => {
    // Check if we need a new page
    if (yPos > doc.internal.pageSize.height - margin) {
      doc.addPage();
      yPos = margin;
    }
    doc.text(`• ${improvement}`, margin, yPos);
    yPos += lineHeight;
  });
  yPos += lineHeight;

  // Section Analysis
  doc.setFontSize(16);
  doc.text('Section-by-Section Analysis', margin, yPos);
  yPos += lineHeight;
  doc.setFontSize(12);

  Object.entries(analysis.sections).forEach(([section, data]) => {
    // Check if we need a new page
    if (yPos > doc.internal.pageSize.height - margin) {
      doc.addPage();
      yPos = margin;
    }

    doc.setFontSize(14);
    doc.text(`${section.charAt(0).toUpperCase() + section.slice(1)}`, margin, yPos);
    yPos += lineHeight;
    doc.setFontSize(12);
    doc.text(`Score: ${data.score}%`, margin + 5, yPos);
    yPos += lineHeight;

    data.feedback.forEach((feedback: string) => {
      if (yPos > doc.internal.pageSize.height - margin) {
        doc.addPage();
        yPos = margin;
      }
      doc.text(`• ${feedback}`, margin + 5, yPos);
      yPos += lineHeight;
    });
    yPos += lineHeight;
  });

  // Footer
  const date = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.text(`Generated on ${date}`, margin, doc.internal.pageSize.height - 10);

  return doc.output('blob');
} 