// resume-renderer.worker.js
// This Web Worker handles page calculation and content distribution

/**
 * Calculate pages needed based on content
 * @param {Object} data - Content data for calculation
 * @param {number} data.pageHeight - Height of A4 page in pixels
 * @param {Array} data.sections - Array of sections with heights
 */
self.onmessage = function(e) {
  const { task, data } = e.data;
  
  switch (task) {
    case 'calculatePages':
      handlePageCalculation(data);
      break;
    case 'distributeContent':
      handleContentDistribution(data);
      break;
    default:
      self.postMessage({ error: 'Unknown task' });
  }
};

/**
 * Calculate how many pages are needed based on content height
 */
function handlePageCalculation(data) {
  const { totalHeight, pageHeight } = data;
  
  try {
    // A4 page height calculation
    const pages = Math.max(1, Math.ceil(totalHeight / pageHeight));
    
    self.postMessage({ 
      task: 'pageCalculationResult', 
      result: {
        pageCount: pages
      }
    });
  } catch (error) {
    self.postMessage({ 
      task: 'pageCalculationResult', 
      error: error.message 
    });
  }
}

/**
 * Distribute content across pages
 */
function handleContentDistribution(data) {
  const { sections, pageHeight, headerHeight } = data;
  
  try {
    // Calculate available height per page (accounting for header)
    const availableHeightFirstPage = pageHeight - headerHeight;
    const availableHeightOtherPages = pageHeight - (headerHeight * 0.3); // Reduced header on other pages
    
    // Distribute sections across pages
    let currentPage = 1;
    let currentPageHeight = 0;
    let pageBreaks = [];
    let sectionPageMap = {};
    
    // First, identify where page breaks should occur
    sections.forEach((section, index) => {
      // Skip personal section (it's part of the header)
      if (section.key === 'personal') {
        return;
      }
      
      const sectionHeight = section.height;
      const availableHeight = currentPage === 1 ? availableHeightFirstPage : availableHeightOtherPages;
      
      // If adding this section would exceed the page height, create a page break
      if (currentPageHeight + sectionHeight > availableHeight) {
        // Special handling for extremely large sections that exceed a page
        if (sectionHeight > availableHeight) {
          // Mark this section as one that spans multiple pages
          // For now, we'll just place it on the next page and let CSS handle overflow
          pageBreaks.push(index);
          currentPage++;
          currentPageHeight = sectionHeight;
        } else {
          // Normal case - section fits on a page but not the current one
          pageBreaks.push(index);
          currentPage++;
          currentPageHeight = sectionHeight;
        }
      } else {
        // Section fits on current page
        currentPageHeight += sectionHeight;
      }
      
      // Map each section to its page
      sectionPageMap[section.key] = currentPage;
    });
    
    self.postMessage({ 
      task: 'contentDistributionResult', 
      result: {
        pageBreaks,
        sectionPageMap,
        pageCount: currentPage
      }
    });
  } catch (error) {
    self.postMessage({ 
      task: 'contentDistributionResult', 
      error: error.message 
    });
  }
}
