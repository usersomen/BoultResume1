const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs/promises');
const { exec } = require('child_process');
const { promisify } = require('util');

async function generateAllPreviews() {
  console.log('Starting preview generation...');

  // Ensure the templates directory exists
  const templatesDir = path.join(process.cwd(), 'public', 'templates');
  try {
    await fs.mkdir(templatesDir, { recursive: true });
  } catch (error) {
    console.error('Failed to create templates directory:', error);
    return;
  }

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2
    }
  });

  const page = await browser.newPage();

  // Sample data for previews
  const sampleData = {
    modernProfile: {
      personalInfo: {
        firstName: "Sarah",
        lastName: "Chen",
        title: "Senior UX/UI Designer",
        email: "sarah.chen@example.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/sarahchen",
        github: "github.com/sarahchen",
        website: "sarahchen.design",
        summary: "Award-winning UX/UI designer with 8+ years of experience...",
        photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=500&auto=format&fit=crop"
      },
      experience: [
        {
          id: "exp1",
          position: "Senior UX/UI Designer",
          company: "Airbnb",
          location: "San Francisco, CA",
          startDate: "Jan 2021",
          endDate: "Present",
          description: "Lead designer for Airbnb's mobile app redesign initiative",
          achievements: [
            "Led the redesign of Airbnb's mobile app, resulting in a 40% increase in user engagement",
            "Developed and implemented a new design system used across 5 product teams",
            "Mentored 4 junior designers and established design review processes",
            "Improved accessibility scores to 98% across all major platforms"
          ]
        }
      ],
      education: [
        {
          id: "edu1",
          school: "Rhode Island School of Design",
          degree: "Bachelor of Fine Arts",
          field: "Graphic Design",
          graduationDate: "2015",
          gpa: "3.9",
          achievements: [
            "Graduated summa cum laude",
            "President of Design Society",
            "Winner of Annual Design Excellence Award"
          ]
        }
      ],
      skills: [
        { name: "UI Design", level: 9 },
        { name: "UX Research", level: 8 },
        { name: "Figma", level: 9 },
        { name: "Adobe Creative Suite", level: 9 }
      ]
    }
  };

  const templates = [
    {
      id: 1,
      name: "Modern Profile",
      data: sampleData.modernProfile
    },
    // Add more templates here
  ];

  for (const template of templates) {
    try {
      console.log(`Generating preview for ${template.name}...`);

      // Navigate to the template preview page
      await page.goto(`http://localhost:5173/preview/${template.id}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait for the template to render
      await page.waitForSelector('.resume-template', { timeout: 10000 });

      // Add some delay to ensure all fonts and images are loaded
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Take a screenshot
      const screenshotPath = path.join(templatesDir, `${template.name.toLowerCase().replace(/\s+/g, '-')}-preview.png`);
      await page.screenshot({
        path: screenshotPath,
        clip: {
          x: 0,
          y: 0,
          width: 1200,
          height: 1600
        },
        omitBackground: true
      });

      console.log(`✓ Generated preview for ${template.name}`);
    } catch (error) {
      console.error(`× Failed to generate preview for ${template.name}:`, error);
    }
  }

  await browser.close();
  console.log('Preview generation complete!');
}

async function main() {
  try {
    // Start the dev server
    const serverProcess = exec('npm run dev');
    
    // Wait for the server to start
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Generate previews
    await generateAllPreviews();

    // Kill the server
    serverProcess.kill();
  } catch (error) {
    console.error('Failed to generate previews:', error);
    process.exit(1);
  }
}

main(); 