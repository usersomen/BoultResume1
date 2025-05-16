import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

/**
 * Generate PDF from HTML content using Puppeteer
 * 
 * This endpoint accepts HTML content and returns a PDF file
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { htmlContent, fileName = 'resume', cssStyles } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    // Create a temporary HTML file to render
    const tempDir = os.tmpdir();
    const htmlFilePath = path.join(tempDir, `${fileName}-${Date.now()}.html`);

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
    await fs.writeFile(htmlFilePath, completeHtml, 'utf-8');

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    // Create a new page
    const page = await browser.newPage();
    
    // Go to the HTML file
    await page.goto(`file://${htmlFilePath}`, {
      waitUntil: 'networkidle0'
    });

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
      preferCSSPageSize: true
    });

    // Close browser and clean up
    await browser.close();
    await fs.unlink(htmlFilePath);

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName.replace(/\s+/g, '_')}.pdf`);
    
    // Send the PDF
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Error generating PDF' });
  }
}
