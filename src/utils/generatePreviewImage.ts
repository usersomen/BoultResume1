import html2canvas from 'html2canvas';

export const generatePreviewImage = async (
  templateId: string,
  element: HTMLElement,
  width: number = 1200,
  height: number = 1600
): Promise<string> => {
  try {
    // Set temporary styles for preview
    const originalStyle = element.style.cssText;
    element.style.cssText = `
      width: ${width}px !important;
      height: ${height}px !important;
      transform: scale(1) !important;
      background: white !important;
      position: fixed !important;
      top: -9999px !important;
      left: -9999px !important;
    `;

    // Generate canvas
    const canvas = await html2canvas(element, {
      width,
      height,
      scale: 2, // Higher resolution
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    // Convert to PNG
    const imageUrl = canvas.toDataURL('image/png');

    // Save the image
    const link = document.createElement('a');
    link.download = `${templateId}-preview.png`;
    link.href = imageUrl;
    link.click();

    // Restore original styles
    element.style.cssText = originalStyle;

    return imageUrl;
  } catch (error) {
    console.error('Error generating preview:', error);
    throw error;
  }
}; 