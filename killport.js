/**
 * Utility script to kill processes running on specific ports
 * Usage: node killport.js 3001 5173
 */
import { execSync } from 'child_process';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node killport.js PORT1 PORT2 ...');
  process.exit(1);
}

args.forEach(port => {
  try {
    console.log(`Attempting to kill process on port ${port}...`);
    
    // Get the PID using netstat
    const command = `netstat -ano | findstr :${port} | findstr LISTENING`;
    const result = execSync(command, { encoding: 'utf-8' });
    
    // Extract PID from the result
    const lines = result.split('\n').filter(line => line.trim().length > 0);
    
    if (lines.length === 0) {
      console.log(`No process found running on port ${port}`);
      return;
    }
    
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      
      if (pid && /^\d+$/.test(pid)) {
        // Kill the process
        console.log(`Killing process ${pid} on port ${port}`);
        execSync(`taskkill /F /PID ${pid}`);
        console.log(`Successfully terminated process ${pid}`);
      }
    }
  } catch (error) {
    console.error(`Error killing process on port ${port}:`, error.message);
  }
});

console.log('Completed port cleanup');
