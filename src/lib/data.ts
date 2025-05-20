import { 
  Project, 
  PhotoCollection, 
  Business,
  Nonprofit 
} from './types';

// Validate image URL format
const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  const pattern = /^\/images\/(previews|projects|photography|business|nonprofit)\/[a-zA-Z0-9-_/]+\.(jpg|jpeg|png|webp)$/i;
  return pattern.test(url);
};

// Helper to ensure consistent preview image path
const getPreviewImagePath = (id: string): string => {
  const path = `/images/previews/${id}.jpg`;
  return isValidImageUrl(path) ? path : '/images/placeholders/site-preview-placeholder.jpg';
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'Nonprofit Website',
    description: 'A website for a nonprofit organization with a focus on improving organization and management of resources. Built with modern web technologies for a seamless user experience.',
    imageUrl: getPreviewImagePath('1'),
    folderName: 'nonprofit',
    tags: ['Next.js', 'React', 'Vercel', 'TypeScript'],
    demoUrl: 'https://www.aevita.org',
    githubUrl: 'https://github.com/bmcgauley/nonprofit',
    featured: true
  },
  {
    id: '2',
    title: 'CentralAuth',
    description: 'Authentication system enhancing user flow and management. Implemented secure login, user registration, and account management features with modern security standards.',
    imageUrl: getPreviewImagePath('2'),
    folderName: 'central-auth',
    tags: ['React', 'Authentication', 'User Management', 'Security'],
    demoUrl: 'https://central-auth-zeta.vercel.app',
    githubUrl: 'https://github.com/bmcgauley/CentralAuth',
    featured: true
  },
  {
    id: '3',
    title: 'PageParser',
    description: 'A content parsing application that extracts and organizes data from web pages. This recovery tool makes information retrieval and analysis more efficient.',
    imageUrl: getPreviewImagePath('3'),
    folderName: 'page-parser',
    tags: ['JavaScript', 'Data Processing', 'Content Extraction'],
    demoUrl: 'https://page-parser-three.vercel.app',
    githubUrl: 'https://github.com/bmcgauley/PageParser',
    featured: false
  },
  {
    id: '4',
    title: 'Catch Master Pro',
    description: 'Refactored navigation and authentication context for improved readability. This application enhances user experience through optimized UI/UX design.',
    imageUrl: getPreviewImagePath('4'),
    folderName: 'catch-master-pro',
    tags: ['React', 'Navigation', 'Auth Context', 'UI/UX'],
    demoUrl: 'https://catch-master-pro.vercel.app',
    githubUrl: 'https://github.com/bmcgauley/CatchMaster_Pro',
    featured: false
  },
  {
    id: '5',
    title: 'The Collegian Digital Signage',
    description: 'Digital signage application for The Collegian, displaying news and updates across campus. This solution provides real-time information to students and faculty.',
    imageUrl: getPreviewImagePath('5'),
    folderName: 'collegian',
    tags: ['HTML', 'CSS', 'JavaScript', 'Digital Signage'],
    demoUrl: 'https://fresnostatehousing.org/signage/wp-content/uploads/2024/10/TheCollegian/index.html',
    featured: true
  },
  {
    id: '6',
    title: 'FSH Dashboard',
    description: 'Custom WordPress plugin developed for Fresno State Housing that provides a comprehensive SEO & Analytics Dashboard for monitoring and managing housing resources. Features include performance metrics tracking, automated feed updates, data entry capabilities, and detailed analytics reporting. The dashboard provides administrators with real-time insights into website performance with a clean, user-friendly interface. Built with secure authentication and role-based access control, this solution helps housing administrators make data-driven decisions.\n\nVersion 1.0.12 introduced several improvements including release preparations, documentation updates, and security enhancements to ensure sensitive data is protected via proper .env configurations.',
    imageUrl: '/images/projects/fsh-dash/image.png',
    folderName: 'fsh-dash',
    tags: ['WordPress', 'PHP', 'JavaScript', 'MySQL', 'Dashboard', 'Analytics', 'SEO'],
    featured: true
  },
  {
    id: '7',
    title: 'Resident Appreciation Dashboard (RAD)',
    description: 'An application for Fresno State Housing to manage and track resident appreciation efforts. Currently in development, this tool will streamline appreciation activities and recognition programs.',
    imageUrl: getPreviewImagePath('7'),
    folderName: 'rad',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web App'],
    demoUrl: 'https://fresnostatehousing.org/wp-content/uploads/2025/03/RAD/index.html',
    featured: true
  },  
  {    
    id: '8',
    title: 'AJ for City Council',
    description: 'Official campaign website for AJ\'s city council candidacy. Features responsive design, donation integration, volunteer sign-up, and event management. The website serves as a hub for campaign information and community engagement.',
    imageUrl: getPreviewImagePath('8'),
    folderName: 'aj-city-council',
    tags: ['Next.js', 'React', 'Political', 'UI/UX'],
    demoUrl: 'https://ajforcitycouncil.com',
    githubUrl: '',
    featured: true
  }
];

export const photoCollections: PhotoCollection[] = [
  {
    id: '1',
    title: 'Urban Landscapes',
    description: 'Exploring city architecture and urban environments.',
    coverImage: '/images/photography/urban/cover.jpg',
    images: [
      {
        id: '1-1',
        title: 'City Skyline',
        imageUrl: '/images/photography/urban/skyline.jpg',
        description: 'Downtown skyline at sunset'
      },
      {
        id: '1-2',
        title: 'Street Life',
        imageUrl: '/images/photography/urban/street.jpg',
        description: 'Busy street scene with vintage storefronts'
      },
      {
        id: '1-3',
        title: 'Modern Architecture',
        imageUrl: '/images/photography/urban/modern.jpg',
        description: 'Contemporary building with unique design elements'
      }
    ]
  },
  {
    id: '2',
    title: 'Nature Scenes',
    description: 'Exploring the beauty of natural landscapes.',
    coverImage: '/images/photography/nature/cover.jpg',
    images: [
      {
        id: '2-1',
        title: 'Mountain Range',
        imageUrl: '/images/photography/nature/mountains.jpg',
        description: 'Majestic mountain view at dawn'
      },
      {
        id: '2-2',
        title: 'Forest Path',
        imageUrl: '/images/photography/nature/forest.jpg',
        description: 'Misty forest trail in early morning'
      },
      {
        id: '2-3',
        title: 'Ocean Waves',
        imageUrl: '/images/photography/nature/ocean.jpg',
        description: 'Powerful waves crashing against the shore'
      }
    ]
  }
];

// ... rest of the file remains unchanged ...

export const experiences = [
  {
    id: '1',
    position: 'Web Developer',
    company: 'Fresno State Student Housing',
    startDate: '2024-08',
    endDate: 'Present',
    description: 'Led project-based initiatives & business process enhancements including: automated analytics platform reducing data entry time by 95%, implemented SEO optimizations, created digital signage & proxy solutions, designed statistical analysis framework, led website consolidation efforts, and developed floorplan tracking system.',
    skills: ['React', 'Node.js', 'Analytics', 'SEO', 'WordPress', 'Digital Signage']
  },
  {
    id: '2',
    position: 'Former Teaching Assistant',
    company: 'California State University, Fresno',
    startDate: '2024-01',
    endDate: '2024-05',
    description: 'Provided teaching support including grading assignments, maintaining Canvas rubrics, one-on-one student assistance and mentorship, lecture material updates, and course documentation.',
    skills: ['Education', 'Mentorship', 'Documentation', 'Canvas LMS']
  },
  {
    id: '3',
    position: 'Technical Artist',
    company: 'Chant Newall Development Group, LLC',
    startDate: '2017-11',
    endDate: '2021-08',
    description: 'Specialized in 3D, 2D, and audio content creation, developed custom shaders and animations for Unity Engine, automated tasks in Blender, Unity, and 3DS Max, and engaged in client consultation and design meetings. Created audio assets, managed 3D printing prototypes, and implemented game mechanics for interactive learning experiences.',
    skills: ['Unity', 'Blender', '3DS Max', '3D Graphics', 'Animation', 'Client Consultation', 'Audio Engineering', 'Game Development', '3D Printing']
  },
  {
    id: '4',
    position: 'Freelance 3D Designer & Audio Engineer',
    company: 'Self-employed',
    startDate: '2016-01',
    endDate: '2021-12',
    description: 'Created custom 3D printed solutions for clients, designed functional prototypes and decorative items. Provided audio production services including sound design, mixing, and mastering for indie game developers and content creators.',
    skills: ['3D Printing', '3D Modeling', 'Fusion 360', 'Audio Engineering', 'Sound Design', 'Pro Tools', 'Ableton Live']
  }
];

export const education = [
  {
    id: '1',
    institution: 'California State University, Fresno',
    degree: "Bachelor's Degree",
    field: 'Business Administration (Computer Information Systems)',
    startDate: '2023',
    endDate: '2025 (Expected)',
    gpa: '3.82',
    honors: [
      {
        type: "President's List",
        date: 'Fall 2024',
        description: '4.00 GPA for the semester'
      },
      {
        type: "Dean's List",
        date: 'Spring 2024',
        description: '3.80 GPA for the semester'
      }
    ],
    associations: [
      {
        name: 'Phi Kappa Phi (ΦΚΦ)',
        induction_date: 'May 2025'
      },
      {
        name: 'Beta Gamma Sigma (ΒΓΣ)',
        induction_date: 'May 2025'
      },
      {
        name: 'CISSA (Computer Information Systems Student Association)',
        role: 'Member'
      }
    ]
  },
  {
    id: '2',
    institution: 'Clovis Community College',
    degree: "Associate's Degrees & Certificate",
    field: 'Multiple: Information Systems (Networking & Web Programming), Cyber Security, Business Administration',
    startDate: '2021',
    endDate: '2023',
    gpa: '3.958',
    associations: [
      {
        name: 'Alpha Gamma Sigma (ΑΓΣ)',
        induction_date: 'March 2023',
        role: 'Permanent Member'
      }
    ]
  }
];

export const skills = [
  {
    category: 'Frontend Development',
    items: ['React', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Markdown']
  },
  {
    category: 'Backend Development',
    items: ['Node.js', 'Express.js', 'RESTful APIs', 'PHP', 'Lua', 'Flask', 'CORS/Proxy Servers']
  },
  {
    category: 'Database & Cloud',
    items: ['Firebase', 'Firestore', 'SQL', 'MariaDB', 'MongoDB', 'PostgreSQL', 'Oracle', 'ERD Modeling']
  },
  {
    category: 'Development Tools',
    items: ['VS Code', 'Replit', 'Cursor AI', 'Git', 'GitHub', 'SourceTree', 'Jira', 'Confluence']
  },
  {
    category: 'Analytics & Business',
    items: ['Google Analytics', 'GTMetrix', 'PageSpeed Insights', 'Statistical Analysis', 'Data Visualization', 'R', 'Python']
  },
  {
    category: 'Systems & Architecture',
    items: ['SDLC Methodologies', 'UML', 'MVC', 'API Design', 'Component Design', 'WordPress Development']
  },
  {
    category: '3D & Game Development',
    items: ['Unity Engine', 'Unreal Engine', 'Game Design', 'Level Design', 'C#', 'Blender', '3DS Max', 'Shader Programming']
  },
  {
    category: '3D Printing & Modeling',
    items: ['FDM Printing', 'Resin Printing', 'Cura', 'PrusaSlicer', 'Fusion 360', 'AutoCAD', 'STL Design', 'Post-Processing']
  },
  {
    category: 'Audio Engineering',
    items: ['Pro Tools', 'Ableton Live', 'FL Studio', 'Sound Design', 'Mixing', 'Mastering', 'Foley Recording', 'MIDI Production']
  }
];

export const businesses: Business[] = [
  {
    id: '1',
    name: 'Creative Solutions Agency',
    description: 'A digital agency specializing in web design, development, and digital marketing for small to medium-sized businesses.',
    imageUrl: '/images/business/creative.jpg',
    websiteUrl: 'https://example.com/creative'
  },
  {
    id: '2',
    name: 'Tech Consultancy',
    description: 'Providing technical consulting services for businesses looking to transform their digital presence and infrastructure.',
    imageUrl: '/images/business/consulting.jpg',
    websiteUrl: 'https://example.com/consulting'
  }
];

export const nonprofits: Nonprofit[] = [
  {
    id: '1',
    name: 'Digital Literacy Foundation',
    description: 'Empowering communities through digital education and access to technology.',
    imageUrl: '/images/nonprofit/digital.jpg',
    websiteUrl: 'https://example.com/digital-literacy',
    role: 'Board Member'
  },
  {
    id: '2',
    name: 'Code for Good',
    description: 'Developing technology solutions for nonprofit organizations and social enterprises.',
    imageUrl: '/images/nonprofit/code.jpg',
    websiteUrl: 'https://example.com/code-good',
    role: 'Technology Advisor'
  }
];