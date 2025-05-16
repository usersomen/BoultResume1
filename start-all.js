/**
 * Script to start both the Vite dev server and the PDF server
 */
import { spawn } from 'child_process';
import path from 'path';

// Start the Vite server
const viteServer = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

console.log('Starting Vite development server...');

viteServer.on('error', (error) => {
  console.error('Failed to start Vite server:', error);
});

// Start the PDF server
const pdfServer = spawn('npm', ['run', 'start-pdf-server'], {
  stdio: 'inherit',
  shell: true
});

console.log('Starting PDF server...');

pdfServer.on('error', (error) => {
  console.error('Failed to start PDF server:', error);
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  viteServer.kill('SIGINT');
  pdfServer.kill('SIGINT');
  process.exit(0);
});

console.log('\n=================================');
console.log('🚀 All servers started!');
console.log('• Vite Dev Server: http://localhost:5173');
console.log('• PDF Server: http://localhost:3001');
console.log('=================================\n');
console.log('Press Ctrl+C to stop all servers.\n');
