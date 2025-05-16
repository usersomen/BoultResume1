# Resume PDF Export Solution

This project implements a high-quality PDF export solution for the Resume Creator application using Puppeteer for server-side rendering.

## Overview

The PDF export solution consists of two main components:

1. **Express Server with Puppeteer**: A dedicated server that handles HTML-to-PDF conversion
2. **Client-Side Integration**: Code in the React application that sends resume content to the server for PDF generation

## Setup and Usage

### 1. Install Dependencies

```bash
npm install express cors puppeteer
```

### 2. Start the PDF Server

```bash
npm run start-pdf-server
```

This will start the PDF generation server on port 3001.

### 3. Usage in Development

When developing, you need to run both the Vite development server and the PDF server:

- Terminal 1: `npm run dev` (Vite development server)
- Terminal 2: `npm run start-pdf-server` (PDF generation server)

## How It Works

1. The client-side code in `ResumeCreator.tsx` captures the resume content and sends it to the server
2. The server uses Puppeteer to render the HTML content in a headless browser
3. The rendered content is converted to a high-quality PDF document
4. The PDF is sent back to the client for download

## Fallback Mechanism

The solution includes a fallback mechanism using html2canvas and jsPDF when the server is not available:

1. If the server request fails, the client automatically falls back to the client-side PDF generation
2. This ensures users can always export their resumes, even if the server is temporarily unavailable

## Server API Endpoint

### POST /api/generate-pdf

**Request Body:**

```json
{
  "htmlContent": "<div>HTML content of the resume</div>",
  "fileName": "my_resume",
  "cssStyles": "/* Custom CSS styles for the PDF */"
}
```

**Response:**
- Content-Type: application/pdf
- Content-Disposition: attachment; filename=[fileName].pdf

## Configuration

The server is configured to:

- Run on port 3001 by default (can be changed via PORT environment variable)
- Accept large JSON payloads (up to 50MB)
- Run Puppeteer in headless mode
- Generate letter-sized documents
- Apply proper CSS styling for print

## Advantages of This Approach

1. **Higher Quality** - Server-side rendering produces more accurate PDFs than client-side approaches
2. **Better Font Handling** - Puppeteer can properly handle custom fonts and styling
3. **Layout Consistency** - PDFs will look the same regardless of the user's browser or system
4. **Reduced Client-Side Load** - Processing happens on the server, reducing the load on the client

## Future Improvements

1. Implement clustered server for higher throughput
2. Add caching for frequently generated resumes
3. Add authentication for the API endpoint
4. Implement PDF compression options
5. Add more customization options for page size and orientation
