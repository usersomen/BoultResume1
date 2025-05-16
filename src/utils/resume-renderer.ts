// resume-renderer.ts
// Utility module to handle resume rendering and pagination

export interface SectionData {
  key: string;
  height: number;
}

export interface PageCalculationData {
  totalHeight: number;
  pageHeight: number;
}

export interface ContentDistributionData {
  sections: SectionData[];
  pageHeight: number;
  headerHeight: number;
}

export interface PageCalculationResult {
  pageCount: number;
}

export interface ContentDistributionResult {
  pageBreaks: number[];
  sectionPageMap: Record<string, number>;
  pageCount: number;
}

// Create a worker instance
let worker: Worker | null = null;

/**
 * Initialize the renderer worker
 */
function initializeWorker() {
  if (typeof Window === 'undefined' || !window.Worker) {
    console.warn('Web Workers not supported in this environment');
    return null;
  }
  
  if (!worker) {
    try {
      worker = new Worker(new URL('./resume-renderer.worker.js', import.meta.url), { type: 'module' });
    } catch (error) {
      console.error('Error initializing Web Worker:', error);
      return null;
    }
  }
  
  return worker;
}

/**
 * Calculate how many pages are needed based on content height
 */
export function calculatePages(data: PageCalculationData): Promise<PageCalculationResult> {
  const w = initializeWorker();
  
  if (!w) {
    // Fallback calculation if worker isn't available
    const pages = Math.max(1, Math.ceil(data.totalHeight / data.pageHeight));
    return Promise.resolve({ pageCount: pages });
  }
  
  return new Promise((resolve, reject) => {
    const messageHandler = (e: MessageEvent) => {
      const { task, result, error } = e.data;
      
      if (task === 'pageCalculationResult') {
        w.removeEventListener('message', messageHandler);
        
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      }
    };
    
    w.addEventListener('message', messageHandler);
    w.postMessage({ task: 'calculatePages', data });
  });
}

/**
 * Distribute content across pages
 */
export function distributeContent(data: ContentDistributionData): Promise<ContentDistributionResult> {
  const w = initializeWorker();
  
  if (!w) {
    // Fallback distribution if worker isn't available
    let currentPage = 1;
    let currentPageHeight = 0;
    let pageBreaks: number[] = [];
    let sectionPageMap: Record<string, number> = {};
    
    const availableHeightFirstPage = data.pageHeight - data.headerHeight;
    const availableHeightOtherPages = data.pageHeight - (data.headerHeight * 0.3);
    
    data.sections.forEach((section, index) => {
      if (section.key === 'personal') return;
      
      const availableHeight = currentPage === 1 ? availableHeightFirstPage : availableHeightOtherPages;
      
      if (currentPageHeight + section.height > availableHeight) {
        pageBreaks.push(index);
        currentPage++;
        currentPageHeight = section.height;
      } else {
        currentPageHeight += section.height;
      }
      
      sectionPageMap[section.key] = currentPage;
    });
    
    return Promise.resolve({
      pageBreaks,
      sectionPageMap,
      pageCount: currentPage
    });
  }
  
  return new Promise((resolve, reject) => {
    const messageHandler = (e: MessageEvent) => {
      const { task, result, error } = e.data;
      
      if (task === 'contentDistributionResult') {
        w.removeEventListener('message', messageHandler);
        
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
      }
    };
    
    w.addEventListener('message', messageHandler);
    w.postMessage({ task: 'distributeContent', data });
  });
}

/**
 * Cleanup worker when no longer needed
 */
export function cleanupRenderer() {
  if (worker) {
    worker.terminate();
    worker = null;
  }
}
