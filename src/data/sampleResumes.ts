import { ResumeData } from '../types/resume';

export const sampleResumes: Record<string, ResumeData> = {
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
      summary: "Award-winning UX/UI designer with 8+ years of experience creating user-centered digital experiences for high-profile clients. Specialized in design systems, accessibility, and mobile-first design approaches. Led design teams at Airbnb and Dropbox, consistently delivering projects that increased user engagement by 40% and reduced user friction points by 60%.",
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
      },
      {
        id: "exp2",
        position: "UX Designer",
        company: "Dropbox",
        location: "San Francisco, CA",
        startDate: "Jun 2018",
        endDate: "Dec 2020",
        description: "Senior designer for enterprise products",
        achievements: [
          "Redesigned the enterprise dashboard, reducing task completion time by 45%",
          "Created user research framework adopted by 3 product teams",
          "Led the design of Dropbox's new file sharing experience",
          "Received Design Excellence Award for innovative solutions"
        ]
      },
      {
        id: "exp3",
        position: "UI Designer",
        company: "Adobe",
        location: "San Jose, CA",
        startDate: "Jul 2015",
        endDate: "May 2018",
        description: "Designer for Creative Cloud applications",
        achievements: [
          "Designed interfaces for Adobe XD's initial release",
          "Contributed to Adobe's design system guidelines",
          "Improved user onboarding, reducing drop-off by 35%",
          "Collaborated with engineering teams on implementation"
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
      { name: "Adobe Creative Suite", level: 9 },
      { name: "Design Systems", level: 8 },
      { name: "Prototyping", level: 9 },
      { name: "User Testing", level: 8 },
      { name: "Accessibility", level: 9 }
    ],
    projects: [
      {
        id: "proj1",
        name: "Airbnb Design System",
        description: "Led the development of Airbnb's new design system, improving design consistency and development efficiency.",
        technologies: ["Figma", "React", "Storybook", "CSS Modules"],
        url: "https://airbnb.design"
      },
      {
        id: "proj2",
        name: "Dropbox Enterprise Dashboard",
        description: "Redesigned the enterprise dashboard, improving user efficiency and satisfaction.",
        technologies: ["Sketch", "InVision", "Principle", "Analytics"],
        url: "https://dropbox.com/enterprise"
      }
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Mandarin", proficiency: "Fluent" },
      { name: "French", proficiency: "Intermediate" }
    ],
    certificates: [
      {
        id: "cert1",
        name: "Google UX Design Professional Certificate",
        issuer: "Google",
        date: "2021",
        url: "https://www.coursera.org/google-certificates"
      },
      {
        id: "cert2",
        name: "Accessibility in Design",
        issuer: "Interaction Design Foundation",
        date: "2020",
        url: "https://www.interaction-design.org"
      }
    ]
  },
  executive: {
    personalInfo: {
      firstName: "Michael",
      lastName: "Rodriguez",
      title: "Chief Technology Officer",
      email: "michael.rodriguez@example.com",
      phone: "(555) 234-5678",
      location: "New York, NY",
      linkedin: "linkedin.com/in/michaelrodriguez",
      github: "github.com/mrodriguez",
      website: "michaelrodriguez.tech",
      summary: "Visionary technology leader with 15+ years of experience driving digital transformation and innovation in Fortune 500 companies. Expert in AI/ML, cloud architecture, and digital transformation. Successfully led multiple technology organizations through rapid growth phases, managing teams of 200+ and budgets exceeding $50M.",
      photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=500&auto=format&fit=crop"
    },
    experience: [
      {
        id: "exp1",
        position: "Chief Technology Officer",
        company: "TechVision AI",
        location: "New York, NY",
        startDate: "Jan 2020",
        endDate: "Present",
        description: "Executive leadership for AI-driven enterprise solutions",
        achievements: [
          "Led digital transformation initiatives resulting in 200% revenue growth",
          "Scaled engineering team from 50 to 200+ while maintaining high performance",
          "Implemented AI/ML solutions reducing operational costs by $10M annually",
          "Established technology partnerships with Microsoft, AWS, and Google Cloud"
        ]
      },
      {
        id: "exp2",
        position: "VP of Engineering",
        company: "CloudScale Solutions",
        location: "Boston, MA",
        startDate: "Mar 2016",
        endDate: "Dec 2019",
        description: "Led cloud infrastructure and platform development",
        achievements: [
          "Architected cloud platform serving 10M+ users",
          "Reduced infrastructure costs by 40% through optimization",
          "Led acquisition integration of two technology companies",
          "Established global development centers in 3 countries"
        ]
      },
      {
        id: "exp3",
        position: "Senior Director of Technology",
        company: "Microsoft",
        location: "Redmond, WA",
        startDate: "Jun 2012",
        endDate: "Feb 2016",
        description: "Led Azure cloud services development",
        achievements: [
          "Managed Azure's machine learning platform development",
          "Grew team from 20 to 100+ engineers",
          "Launched 5 major product initiatives",
          "Filed 8 technology patents"
        ]
      }
    ],
    education: [
      {
        id: "edu1",
        school: "Stanford University",
        degree: "Master of Science",
        field: "Computer Science",
        graduationDate: "2012",
        gpa: "3.95",
        achievements: [
          "Specialization in Artificial Intelligence",
          "Published 3 papers in leading conferences",
          "Teaching Assistant for Advanced Algorithms"
        ]
      },
      {
        id: "edu2",
        school: "UC Berkeley",
        degree: "Bachelor of Science",
        field: "Electrical Engineering and Computer Science",
        graduationDate: "2008",
        gpa: "3.92"
      }
    ],
    skills: [
      { name: "Technology Strategy", level: 9 },
      { name: "AI/ML", level: 9 },
      { name: "Cloud Architecture", level: 9 },
      { name: "Digital Transformation", level: 8 },
      { name: "Team Leadership", level: 9 },
      { name: "Enterprise Architecture", level: 8 },
      { name: "Innovation Management", level: 9 },
      { name: "Strategic Planning", level: 9 }
    ],
    projects: [
      {
        id: "proj1",
        name: "Enterprise AI Platform",
        description: "Led the development of an enterprise-scale AI platform serving Fortune 500 clients.",
        technologies: ["TensorFlow", "PyTorch", "Kubernetes", "AWS"],
        url: "https://techvision.ai/platform"
      },
      {
        id: "proj2",
        name: "Cloud Migration Framework",
        description: "Developed a framework for enterprise cloud migration, reducing migration time by 60%.",
        technologies: ["AWS", "Azure", "Terraform", "Docker"],
        url: "https://cloudscale.com/framework"
      }
    ],
    certificates: [
      {
        id: "cert1",
        name: "AWS Solutions Architect Professional",
        issuer: "Amazon Web Services",
        date: "2022",
        url: "https://aws.amazon.com/certification"
      },
      {
        id: "cert2",
        name: "Google Cloud Certified Fellow",
        issuer: "Google Cloud",
        date: "2021",
        url: "https://cloud.google.com/certification"
      },
      {
        id: "cert3",
        name: "Microsoft Azure Solutions Expert",
        issuer: "Microsoft",
        date: "2020",
        url: "https://learn.microsoft.com/certifications"
      }
    ]
  },
  startup: {
    personalInfo: {
      firstName: "Emily",
      lastName: "Zhang",
      title: "Full Stack Developer",
      email: "emily.zhang@example.com",
      phone: "(555) 345-6789",
      location: "Austin, TX",
      linkedin: "linkedin.com/in/emilyzhang",
      github: "github.com/emilyzhang",
      website: "emilyzhang.dev",
      summary: "Full Stack Developer with 6+ years of experience building scalable web applications and microservices. Specialized in React, Node.js, and cloud architecture. Strong focus on code quality, performance optimization, and developer experience. Contributed to open source and mentored junior developers.",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop"
    },
    experience: [
      {
        id: "exp1",
        position: "Senior Software Engineer",
        company: "Stripe",
        location: "Austin, TX",
        startDate: "Feb 2021",
        endDate: "Present",
        description: "Technical lead for payment processing systems",
        achievements: [
          "Architected and launched Stripe's new subscription billing system",
          "Reduced API response time by 40% through optimization",
          "Led team of 6 engineers in microservices migration",
          "Implemented real-time fraud detection system"
        ]
      },
      {
        id: "exp2",
        position: "Software Engineer",
        company: "Shopify",
        location: "Remote",
        startDate: "Mar 2018",
        endDate: "Jan 2021",
        description: "Full stack developer for e-commerce platform",
        achievements: [
          "Developed high-performance checkout experience",
          "Improved test coverage from 65% to 95%",
          "Mentored 4 junior developers",
          "Led migration to TypeScript across 3 services"
        ]
      },
      {
        id: "exp3",
        position: "Full Stack Developer",
        company: "HubSpot",
        location: "Boston, MA",
        startDate: "Jun 2016",
        endDate: "Feb 2018",
        description: "Developer for marketing automation tools",
        achievements: [
          "Built real-time analytics dashboard",
          "Reduced page load time by 60%",
          "Implemented A/B testing framework",
          "Contributed to open source projects"
        ]
      }
    ],
    education: [
      {
        id: "edu1",
        school: "Massachusetts Institute of Technology",
        degree: "Bachelor of Science",
        field: "Computer Science",
        graduationDate: "2016",
        gpa: "3.88",
        achievements: [
          "Minor in Mathematics",
          "Member of Tau Beta Pi Engineering Honor Society",
          "Undergraduate Research Assistant"
        ]
      }
    ],
    skills: [
      { name: "JavaScript/TypeScript", level: 9 },
      { name: "React/Next.js", level: 9 },
      { name: "Node.js", level: 8 },
      { name: "Python", level: 8 },
      { name: "AWS/Cloud", level: 8 },
      { name: "GraphQL", level: 9 },
      { name: "System Design", level: 8 },
      { name: "CI/CD", level: 9 }
    ],
    projects: [
      {
        id: "proj1",
        name: "Open Source Payment SDK",
        description: "Created an open-source SDK for integrating payment processing, used by 1000+ developers.",
        technologies: ["TypeScript", "Node.js", "Jest", "GitHub Actions"],
        url: "https://github.com/emilyzhang/payment-sdk"
      },
      {
        id: "proj2",
        name: "E-commerce Analytics Platform",
        description: "Built a real-time analytics platform processing 1M+ events daily.",
        technologies: ["React", "Python", "AWS Lambda", "DynamoDB"],
        url: "https://github.com/emilyzhang/analytics"
      }
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Mandarin", proficiency: "Fluent" }
    ],
    certificates: [
      {
        id: "cert1",
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2022",
        url: "https://aws.amazon.com/certification"
      },
      {
        id: "cert2",
        name: "Professional Cloud Developer",
        issuer: "Google Cloud",
        date: "2021",
        url: "https://cloud.google.com/certification"
      }
    ]
  }
}; 