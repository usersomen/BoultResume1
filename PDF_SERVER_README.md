# Resume PDF Export Server

## Overview

This PDF Export Server provides high-quality PDF generation for the Resume Creator application using Puppeteer for server-side rendering. It offers improved rendering quality compared to client-side approaches like html2canvas.

## Features

- High-fidelity PDF generation using Puppeteer
- Accurate font rendering and CSS styling
- Proper handling of page margins and sizes
- Server-side processing to reduce client load
- Fallback to client-side generation if server is unavailable

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Install the required dependencies:
   ```bash
   npm install express cors puppeteer
   ```

### Starting the Server

#### Option 1: Using npm script

```bash
npm run start-pdf-server
```

#### Option 2: Using the batch file

```bash
start-pdf-server.bat
```

#### Option 3: Start both servers (Vite & PDF)

```bash
npm run start-all
```

### Stopping the Server

To stop servers running on specific ports:

```bash
npm run killport 3001 5173
```

## Usage

### Client-Side Integration

The PDF export functionality is integrated in the `ResumeCreator.tsx` component:

```tsx
const exportToPDF = async () => {
  // PDF export implementation using Puppeteer server
  const response = await fetch('http://localhost:3001/api/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      htmlContent: resumeElement.innerHTML,
      fileName: 'my_resume',
      cssStyles: '/* Custom CSS styles */'
    }),
  });
  
  // Process response and download PDF
  // ...
};
```

### Server API Endpoint

#### `POST /api/generate-pdf`

Generates a PDF from HTML content.

**Request Body:**

```json
{
  "htmlContent": "<div>Resume HTML content</div>",
  "fileName": "my_resume",
  "cssStyles": "/* Custom CSS styles */"
}
```

**Response:**
- Content-Type: application/pdf
- Content-Disposition: attachment; filename=my_resume.pdf

## Architecture

### Server Components

1. **Express Server** - Handles HTTP requests and serves the PDF API
2. **Puppeteer** - Renders HTML in a headless browser for PDF generation
3. **CORS** - Enables cross-origin requests for development

### Client Components

1. **PDF Export Function** - Communicates with the server for PDF generation
2. **Fallback Mechanism** - Uses html2canvas if server is unavailable

## Troubleshooting

### Common Issues

1. **Server already running on port 3001**
   - Use `npm run killport 3001` to terminate the existing process
   - Check if other applications are using port 3001

2. **PDF quality issues**
   - Ensure all required fonts are available on the server
   - Check CSS styles are properly included

3. **Server not starting**
   - Check for Node.js version compatibility
   - Ensure all dependencies are installed

## Development

### Code Structure

- `server.js` - Main server implementation
- `killport.js` - Utility to kill processes on specific ports
- `start-all.js` - Script to start both Vite and PDF servers

### Extending the Server

To add new features to the PDF server:

1. Modify `server.js` to include additional endpoints or configurations
2. Restart the server using `npm run start-pdf-server`

## Best Practices

1. Always ensure proper error handling on both server and client sides
2. Use appropriate timeouts for PDF generation to prevent hanging
3. Clean up temporary files after PDF generation
4. Implement proper CORS configuration in production

## License

This project is licensed under the MIT License.
