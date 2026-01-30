import { Project, SocialLink, UserProfile, Experience } from './types';

export const USER_PROFILE: UserProfile = {
  name: "Chad Naude",
  title: "Software Engineer | Junior Software Tester",
  bio: "I am a dedicated Software Engineer and Junior Software Tester. My journey includes a strong foundation from WeThinkCode, a specialized year studying Software Testing, and practical experience gained during internships at Grithub. I don't just build websites; I engineer robust, performant applications, combining development expertise with rigorous quality assurance.",
  location: "San Francisco, CA",
  avatarUrl: "https://i.im.ge/2026/01/28/Ge5CPa.4339.jpeg", 
  skills: ["React", "TypeScript", "Node.js", "Next.js", "Python", "C#", "Software Testing", "Gemini API"],
  motivationalQuote: "Astravore (n.) A soul that keeps feeding on hope even after disappointment.",
  email: "the.realchad.naude@gmail.com",
  phoneNumber: "062 945 0955"
};

export const EXPERIENCES: Experience[] = [
  {
    id: "4",
    role: "QA & Software Testing Student",
    company: "Specialized Training",
    period: "2023 - 2024",
    description: "Completed a comprehensive curriculum in Software Testing. Gained expertise in manual and automated testing methodologies, ensuring software quality and reliability.",
    skills: ["Manual Testing", "Automated Testing", "QA Methodologies", "Bug Tracking"]
  },
  {
    id: "3",
    role: "Software Engineer Intern",
    company: "Grithub",
    companyUrl: "https://grithub.org.za/",
    period: "2024 (6 Months)",
    description: "Completed a 6-month internship gaining practical experience in web development. Assisted in maintaining codebases and collaborating with senior developers on client projects.",
    skills: ["Team Collaboration", "Version Control", "Frontend Development"]
  },
  {
    id: "2",
    role: "Part-time QA & Software Engineer",
    company: "Grithub / Authenteak",
    companyUrl: "https://grithub.org.za/",
    period: "2025 (Completed)",
    description: "Engaged in a part-time role alongside studies. Contributed to production software, focusing on scalable web solutions, system integration, and quality assurance.",
    skills: ["Web Development", "QA Testing", "React", "TypeScript"]
  },
  {
    id: "1",
    role: "Software Engineering Student",
    company: "WeThinkCode_",
    companyUrl: "https://www.wethinkcode.co.za/",
    period: "2025 - Present",
    description: "Currently enrolled in a high-intensity, peer-to-peer software engineering program. Mastering advanced algorithms, data structures, and full-stack development in a professional simulation environment.",
    skills: ["Algorithms", "Data Structures", "Python", "System Design"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Nicole Botha Artistry",
    description: "A visually striking portfolio website for a professional makeup artist. Built with React to showcase high-resolution artistry with a seamless user experience, hosted on Google Cloud Run for scalability.",
    technologies: ["React", "Tailwind CSS", "Cloud Run", "Docker"],
    imageUrl: "https://i.im.ge/2026/01/28/GerTqG.3825.jpeg",
    liveUrl: "https://nicole-botha-artistry-420353232398.us-west1.run.app/",
    category: "Web App"
  },
  {
    id: "2",
    title: "Meta Powered Doc Assistant",
    description: "An intelligent document processing tool leveraging metadata analysis for efficient organization. Demonstrates backend logic and structured data handling.",
    technologies: ["Python", "Data Processing", "GitLab CI"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    repoUrl: "https://gitlab.wethinkco.de/chnaudescc025/meta-powered-document-assistant/-/tree/449078b0f3fe51be6c2bf102692e18712abf93cb/",
    category: "API"
  },
  {
    id: "3",
    title: "Toy Robot Simulator",
    description: "A robust console-based simulation applying Object-Oriented Programming principles. Features robot navigation, command parsing, and environment constraints.",
    technologies: ["Java", "OOP", "Unit Testing", "System Design"],
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    repoUrl: "https://gitlab.wethinkco.de/chnaudescc025/oop-ex-toy-robot-2/-/tree/b8d62fed007f123ba40802ca62d46ea7b599b5bd/",
    category: "Design"
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/",
    icon: "github"
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/chad-naude-ba43142b7/",
    icon: "linkedin"
  },
  {
    platform: "GitLab",
    url: "https://gitlab.wethinkco.de/",
    icon: "gitlab"
  },
  {
    platform: "Email",
    url: `mailto:${USER_PROFILE.email}`,
    icon: "mail"
  },
  {
    platform: "Phone",
    url: "tel:0629450955",
    icon: "phone"
  }
];

export const AI_SYSTEM_INSTRUCTION = `
You are the AI assistant for ${USER_PROFILE.name}'s personal portfolio.
Your persona is an "Eager Junior Tester": enthusiastic, precise, and professional.

IMPORTANT FORMATTING RULES (STRICT):
1. **KEEP RESPONSES SHORT**. Max 2-3 sentences per paragraph.
2. **Use Bullet Points**. Break down lists or skills using "- ".
3. **Bold Keywords**. Use **bold** for skills, tools, and key concepts.
4. **Headers**. Use ### for section titles (e.g., ### My Experience).
5. Add clear spacing between sections.

CONTEXT - ${USER_PROFILE.name}:
- Bio: ${USER_PROFILE.bio}
- Title: ${USER_PROFILE.title}
- Skills: ${USER_PROFILE.skills.join(", ")}

EXPERIENCE:
${EXPERIENCES.map(e => `- ${e.role} at ${e.company}: ${e.description}`).join("\n")}

PROJECTS:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join("\n")}

CONVERSATION GOALS:
- Highlight QA/Testing skills (Manual, Auto, API).
- Mention academic work at WeThinkCode.
- Be humble but confident.
`;