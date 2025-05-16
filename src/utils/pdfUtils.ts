/**
 * Utility functions for PDF generation using Puppeteer via API endpoint
 */

/**
 * Generates a PDF from resume HTML content using Puppeteer
 * @param resumeElement - The resume DOM element reference
 * @param templateName - The name of the active template
 * @param fileName - The desired file name for the PDF
 * @returns A promise that resolves when the PDF is downloaded
 */
export const generatePuppeteerPDF = async (
  resumeElement: HTMLElement,
  templateName: string,
  fileName: string = 'resume'
): Promise<void> => {
  try {
    // Clone the element to avoid modifying the original
    const clonedElement = resumeElement.cloneNode(true) as HTMLElement;
    
    // Remove watermark if present
    const watermark = clonedElement.querySelector('.absolute.bottom-2.right-4');
    if (watermark) watermark.remove();
    
    // Additional CSS to ensure proper rendering
    const additionalCSS = `
      .resume-${templateName} {
        height: 100%;
        width: 100%;
      }
      h1 { font-size: 24px; font-weight: bold; }
      h2 { font-size: 18px; color: #4B5563; }
      h3 { font-size: 16px; font-weight: 600; }
      .mb-6 { margin-bottom: 1.5rem; }
      .p-8 { padding: 2rem; }
      
      /* Print quality improvements */
      * {
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
      }
    `;
    
    // Call the puppeteer API endpoint
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        htmlContent: clonedElement.innerHTML,
        fileName: fileName.replace(/\s+/g, '_'),
        cssStyles: additionalCSS
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Get the PDF blob from the response
    const pdfBlob = await response.blob();
    
    // Create a download link
    const downloadUrl = URL.createObjectURL(pdfBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.download = `${fileName.replace(/\s+/g, '_')}.pdf`;
    
    // Trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Clean up the URL object
    URL.revokeObjectURL(downloadUrl);
    
  } catch (error) {
    console.error('Error generating PDF with Puppeteer:', error);
    throw error;
  }
};
