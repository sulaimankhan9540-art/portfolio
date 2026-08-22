export interface Profile {
  name: string;
  title: string;
  tagline: string;
  photo: string;
  about: string;
  careerObjective: string;
  summary: string;
  interests: string[];
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  portfolio: string;
  otherLinks: { label: string; url: string }[];
  dateOfBirth: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  startYear: string;
  endYear: string;
  grade: string;
  description: string;
  logo: string;
  certificate: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  skills: string[];
  certificate: string;
  images: string[];
}

export interface Certificate {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  credentialId: string;
  description: string;
  file: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  shortDescription: string;
  detailedDescription: string;
  tools: string[];
  role: string;
  images: string[];
  videoUrl: string;
  githubUrl: string;
  liveUrl: string;
  documentation: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface PortfolioData {
  profile: Profile;
  education: Education[];
  experience: Experience[];
  certificates: Certificate[];
  projects: Project[];
  skills: Skill[];
}
