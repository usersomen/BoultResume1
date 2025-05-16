import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Simple logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'PDF server is running' });
});

// PDF Generation endpoint
app.post('/api/generate-pdf', async (req, res) => {
  let browser = null;
  let htmlFilePath = null;
  
  try {
    const { htmlContent, fileName = 'resume', cssStyles } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    // Create a temporary HTML file to render
    const tempDir = os.tmpdir();
    htmlFilePath = join(tempDir, `${fileName}-${Date.now()}.html`);

    // Create complete HTML document with proper styling
    const completeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${fileName}</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-color: white;
            }
            .resume-container {
              width: 8.5in;
              min-height: 11in;
              margin: 0;
              padding: 0;
              position: relative;
              background-color: white;
            }
            @page {
              size: letter;
              margin: 0;
            }
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
            }
            /* Improved icon alignment */
            .flex, .flex-row, .inline-flex {
              display: flex !important;
            }
            .items-center {
              align-items: center !important;
            }
            .justify-center {
              justify-content: center !important;
            }
            .flex-col {
              flex-direction: column !important;
            }
            .justify-between {
              justify-content: space-between !important;
            }
            .gap-1 {
              gap: 0.25rem !important;
            }
            .gap-2 {
              gap: 0.5rem !important;
            }
            .gap-3 {
              gap: 0.75rem !important;
            }
            .gap-4 {
              gap: 1rem !important;
            }
            /* Icon specific styling */
            svg, .icon, .w-4, .h-4, .w-5, .h-5 {
              display: inline-block !important;
              vertical-align: middle !important;
            }
            .w-4, .h-4 {
              width: 1rem !important;
              height: 1rem !important;
            }
            .w-5, .h-5 {
              width: 1.25rem !important;
              height: 1.25rem !important;
            }
            .mr-1 {
              margin-right: 0.25rem !important;
            }
            .mr-2 {
              margin-right: 0.5rem !important;
            }
            ${cssStyles || ''}
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${htmlContent}
          </div>
        </body>
      </html>
    `;

    // Write the HTML to a temporary file
    fs.writeFileSync(htmlFilePath, completeHtml, 'utf-8');
    console.log(`Created temporary HTML file: ${htmlFilePath}`);

    // Launch Puppeteer with a timeout
    const browserPromise = puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--font-render-hinting=none',
        '--disable-gpu-vsync',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ],
      ignoreHTTPSErrors: true,
    });
    
    // Add a timeout for browser launch
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Browser launch timeout')), 30000)
    );
    
    browser = await Promise.race([browserPromise, timeoutPromise]);
    console.log('Browser launched successfully');
    
    // Create a new page
    const page = await browser.newPage();
    
    // Set viewport size to match letter size with higher DPI
    await page.setViewport({
      width: 816,  // 8.5in at 96dpi
      height: 1056, // 11in at 96dpi
      deviceScaleFactor: 2, // Higher resolution for better rendering
    });
    
    // Enable request interception to load web fonts if needed
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      request.continue();
    });
    
    // Go to the HTML file with a timeout
    await page.goto(`file://${htmlFilePath}`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    console.log('Page loaded successfully');

    // Wait for any web fonts to load
    await page.waitForTimeout(500);
    
    // Force re-render the page for better SVG and icon rendering
    await page.evaluate(() => {
      // Force a re-layout by modifying and restoring a property
      document.body.style.zoom = '1.0001';
      setTimeout(() => { document.body.style.zoom = '1'; }, 10);
      
      // Force SVG redraw
      const svgs = document.querySelectorAll('svg');
      svgs.forEach(svg => {
        svg.style.transform = 'scale(1.001)';
        setTimeout(() => { svg.style.transform = 'scale(1)'; }, 10);
      });
    });
    
    // Additional wait to ensure all rendering is complete
    await page.waitForTimeout(300);
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      },
      preferCSSPageSize: true,
      scale: 1.0,
      omitBackground: false,
      displayHeaderFooter: false,
      landscape: false
    });
    console.log('PDF generated successfully');

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName.replace(/\s+/g, '_')}.pdf`);
    
    // Send the PDF
    res.status(200).send(pdfBuffer);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ 
      error: 'Error generating PDF', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  } finally {
    // Clean up resources
    try {
      if (browser) {
        await browser.close();
        console.log('Browser closed');
      }
      
      if (htmlFilePath && fs.existsSync(htmlFilePath)) {
        fs.unlinkSync(htmlFilePath);
        console.log(`Temporary file deleted: ${htmlFilePath}`);
      }
    } catch (cleanupError) {
      console.error('Error during cleanup:', cleanupError);
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`PDF generation server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`PDF endpoint: http://localhost:${PORT}/api/generate-pdf`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
