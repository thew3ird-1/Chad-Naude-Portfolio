
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  category: 'Web App' | 'Mobile' | 'Design' | 'API';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'mail' | 'external' | 'code' | 'gitlab' | 'phone';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  location: string;
  avatarUrl: string;
  skills: string[];
  motivationalQuote?: string;
  email?: string;
  phoneNumber?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: string;
  skills: string[];
}