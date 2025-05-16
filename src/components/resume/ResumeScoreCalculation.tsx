// This file contains the implementation for proper resume score calculation
// Add this function to ResumeCreator.tsx around line 1023 (before the return statement)

/*
Add this function:
*/

const calculateResumeScore = () => {
  const totalScore = 100;
  const sections = {
    // Basic personal info - 25 points total
    'name': 5,
    'title': 5,
    'email': 5,
    'phone': 5,
    'location': 5,
    
    // Content sections - 75 points total
    'summary': 15,           // More weight for a good summary
    'employment': 20,        // Most important section
    'education': 15,
    'skills': 15,
    'links': 10,
  };

  let currentScore = 0;

  // Calculate score for basic fields
  if (resumeData.name.trim()) currentScore += sections.name;
  if (resumeData.title.trim()) currentScore += sections.title;
  if (resumeData.email.trim()) currentScore += sections.email;
  if (resumeData.phone.trim()) currentScore += sections.phone;
  if (resumeData.location.trim()) currentScore += sections.location;
  
  // Summary section - check for meaningful content
  if (resumeData.summary.length > 50) {
    currentScore += sections.summary;
  } else if (resumeData.summary.length > 10) {
    currentScore += Math.floor(sections.summary / 2); // Partial credit
  }
  
  // Employment section
  if (resumeData.employment.length > 0) {
    // Give partial credit based on number of entries and completeness
    const filledEmployments = resumeData.employment.filter(job => 
      job.company.trim() && job.position.trim() && job.description.trim()
    );
    
    if (filledEmployments.length > 0) {
      const employmentScore = Math.min(
        sections.employment,
        Math.ceil((filledEmployments.length / Math.max(1, resumeData.employment.length)) * sections.employment)
      );
      currentScore += employmentScore;
    }
  }
  
  // Education section
  if (resumeData.education.length > 0) {
    // Give partial credit based on number of entries and completeness
    const filledEducations = resumeData.education.filter(edu => 
      edu.institution.trim() && edu.degree.trim()
    );
    
    if (filledEducations.length > 0) {
      const educationScore = Math.min(
        sections.education,
        Math.ceil((filledEducations.length / Math.max(1, resumeData.education.length)) * sections.education)
      );
      currentScore += educationScore;
    }
  }
  
  // Skills section
  if (resumeData.skills.length > 0) {
    // Give partial credit based on number of skills
    const skillScore = Math.min(
      sections.skills,
      Math.ceil((resumeData.skills.length / 5) * sections.skills)
    );
    currentScore += skillScore;
  }
  
  // Links section
  if (resumeData.links.length > 0) {
    const linkScore = Math.min(
      sections.links,
      Math.ceil((resumeData.links.length / 2) * sections.links)
    );
    currentScore += linkScore;
  }
  
  // Additional sections could add bonus points, but we'll keep it at 100 max
  setResumeScore(Math.min(currentScore, totalScore));
};

// Add this useEffect to recalculate score whenever resumeData changes
useEffect(() => {
  calculateResumeScore();
}, [resumeData]);
