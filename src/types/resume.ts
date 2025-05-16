export interface ResumeData {
  personalInfo?: {
    name?: string;
    firstName?: string;
    lastName?: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
    photo?: string;
  };
  summary?: string;
  experience?: Array<{
    id: string;
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current?: boolean;
    description: string;
    achievements: string[];
  }>;
  education?: Array<{
    id: string;
    institution?: string;
    school?: string;
    degree?: string;
    field?: string;
    startDate?: string;
    endDate?: string;
    graduationDate?: string;
    current?: boolean;
    location?: string;
    gpa?: string;
    courses?: string[];
    achievements?: string[];
  }>;
  skills?: Array<{
    id?: string;
    name: string;
    level?: number;
    category?: string;
  }>;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    technologies: string[];
    url?: string;
  }>;
  languages?: Array<{
    id?: string;
    name: string;
    proficiency: string;
  }>;
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    expirationDate?: string;
    url?: string;
  }>;
  volunteer?: Array<{
    id: string;
    organization: string;
    position: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    location?: string;
    description: string;
  }>;
  publications?: Array<{
    id: string;
    title: string;
    publisher: string;
    date: string;
    url?: string;
    description?: string;
  }>;
  organizations?: Array<{
    id: string;
    name: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    description?: string;
  }>;
  conferences?: Array<{
    id: string;
    name: string;
    role?: string;
    date: string;
    location?: string;
    description?: string;
  }>;
  references?: Array<{
    id: string;
    name: string;
    company: string;
    position: string;
    email?: string;
    phone?: string;
    reference?: string;
  }>;
  templateId?: string;
  customSections?: Record<string, any[]>;
}