// pdf-generator.ts
// Advanced PDF generation utilities that handle multi-page resumes

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// A4 dimensions (in mm and pixels)
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX = 595;
const A4_HEIGHT_PX = 842;

/**
 * Generate a PDF with proper pagination from multiple HTML elements
 * Each element represents one page of the resume
 */
export async function generateMultiPagePDF(pageElements: HTMLElement[], filename: string): Promise<Blob> {
  try {
    // Create PDF document (A4 size)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Track if we're on the first page (no need to add page for first one)
    let isFirstPage = true;
    
    // Process each page element
    for (const element of pageElements) {
      // For pages after the first, add a new page
      if (!isFirstPage) {
        pdf.addPage();
      }
      
      // Make sure any overflow is hidden for proper rendering
      const originalOverflow = element.style.overflow;
      element.style.overflow = 'hidden';
      
      // Convert the HTML to canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (document, clonedElement) => {
          // Additional processing for cloned elements to ensure proper rendering
          const contentSections = clonedElement.querySelectorAll('.mb-6[data-section]');
          contentSections.forEach(section => {
            // Make sure sections respect page boundaries
            (section as HTMLElement).style.pageBreakInside = 'avoid';
            (section as HTMLElement).style.breakInside = 'avoid';
          });
        }
      });
      
      // Restore original overflow
      element.style.overflow = originalOverflow;
      
      // Calculate proper scaling to fit A4
      const imgData = canvas.toDataURL('image/png');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const canvasRatio = canvas.height / canvas.width;
      const pdfRatio = pageHeight / pageWidth;
      
      let imgWidth = pageWidth;
      let imgHeight = imgWidth * canvasRatio;
      
      // If image height exceeds page height, scale it down
      if (imgHeight > pageHeight) {
        imgHeight = pageHeight;
        imgWidth = imgHeight / canvasRatio;
      }
      
      // Add image to PDF
      pdf.addImage(
        imgData,
        'PNG',
        (pageWidth - imgWidth) / 2, // Center horizontally
        0,
        imgWidth,
        imgHeight
      );
      
      isFirstPage = false;
    }
    
    // Return the PDF as a blob
    return pdf.output('blob');
  } catch (error) {
    console.error('Error generating multi-page PDF:', error);
    throw error;
  }
}

/**
 * Utility function to capture all pages of a multi-page resume for PDF generation
 * This handles rendering each page and collecting all page elements
 */
export async function captureAllResumePages(
  resumeElement: HTMLElement,
  pageCount: number,
  pageRefs: React.MutableRefObject<(HTMLElement | null)[]>,
  setCurrentPage: (page: number) => void
): Promise<HTMLElement[]> {
  // Store the current page to restore later
  const originalPage = parseInt(resumeElement.getAttribute('data-current-page') || '1');
  
  // Ensure we have valid page elements
  const pageElements: HTMLElement[] = [];
  
  // First page is always the main resume element
  pageElements.push(resumeElement);
  
  // For multi-page resumes, capture each additional page
  if (pageCount > 1) {
    for (let i = 1; i < pageCount; i++) {
      // Set current page to ensure the page is rendered
      setCurrentPage(i + 1);
      
      // Wait for the page to render
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get the page element from refs
      const pageElement = pageRefs.current[i];
      
      if (pageElement) {
        pageElements.push(pageElement);
      } else {
        console.warn(`Page ${i + 1} element not found`);
      }
    }
  }
  
  // Restore original page
  setCurrentPage(originalPage);
  
  return pageElements;
}

/**
 * Generate PDF from a single HTML element, possibly containing multiple pages
 * Uses CSS-based pagination for proper rendering
 */
export async function generateSingleElementPDF(element: HTMLElement, filename: string): Promise<Blob> {
  try {
    // Create a clone of the element for manipulation
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Create a container for the cloned element
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.appendChild(clone);
    document.body.appendChild(container);
    
    // Apply print-specific styling to ensure proper page breaks
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        .page-break {
          page-break-after: always;
          break-after: page;
        }
      }
    `;
    container.appendChild(style);
    
    try {
      // Generate PDF using html2canvas and jsPDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Get computed height of the content
      const contentHeight = clone.scrollHeight;
      const pagesNeeded = Math.ceil(contentHeight / A4_HEIGHT_PX);
      
      // For multi-page content, we need to capture each page separately
      for (let i = 0; i < pagesNeeded; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        // Adjust position to capture the right part of the content
        clone.style.transform = `translateY(${-i * A4_HEIGHT_PX}px)`;
        
        const canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          height: Math.min(A4_HEIGHT_PX, contentHeight - (i * A4_HEIGHT_PX)),
          windowHeight: A4_HEIGHT_PX,
          y: i * A4_HEIGHT_PX
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        pdf.addImage(
          imgData,
          'PNG',
          0,
          0,
          A4_WIDTH_MM,
          (canvas.height * A4_WIDTH_MM) / canvas.width
        );
      }
      
      return pdf.output('blob');
    } finally {
      // Cleanup
      document.body.removeChild(container);
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

/**
 * Generate PDF using server-side Puppeteer rendering for best quality
 */
export async function generatePuppeteerPDF(element: HTMLElement, filename: string): Promise<boolean> {
  try {
    // Clone the element to ensure we don't affect the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Send HTML content to server for PDF generation
    const response = await fetch('http://localhost:3001/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        htmlContent: clonedElement.innerHTML, 
        fileName: filename,
        pageCount: Math.max(1, Math.ceil(clonedElement.scrollHeight / A4_HEIGHT_PX))
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    // Get the PDF file from the response
    const blob = await response.blob();
    
    // Create a download link and trigger it
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF with server:', error);
    throw error;
  }
}
