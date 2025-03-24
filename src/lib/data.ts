import { 
  Project, 
  PhotoCollection, 
  Business,
  Nonprofit 
} from './types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Nonprofit Website',
    description: 'A website for a nonprofit organization with a focus on improving organization and management of resources. Built with modern web technologies for a seamless user experience.',
    imageUrl: '/images/previews/1.jpg',
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
    imageUrl: '/images/previews/2.jpg',
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
    imageUrl: '/images/previews/3.jpg',
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
    imageUrl: '/images/previews/4.jpg',
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
    imageUrl: '/images/previews/5.jpg',
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
    imageUrl: '/images/previews/7.jpg',
    folderName: 'rad',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web App'],
    demoUrl: 'https://fresnostatehousing.org/wp-content/uploads/2025/03/RAD/index.html',
    featured: true
  },
  {
    id: '8',
    title: 'Campaign Website',
    description: 'A Webflow-based website for a confidential campaign. Designed with modern aesthetics and optimized for conversion and engagement.',
    imageUrl: '/images/projects/campaign/image.png',
    folderName: 'campaign',
    tags: ['Webflow', 'Web Design', 'Campaign'],
    featured: false
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
    position: 'Teaching Assistant',
    company: 'California State University, Fresno',
    startDate: '2024-01',
    endDate: '2024-05',
    description: 'Assisted in teaching-related tasks including grading assignments, maintaining Canvas rubrics, providing one-on-one student assistance and mentorship, updating lecture materials, and generating course documentation.',
    skills: ['Education', 'Mentorship', 'Documentation', 'Canvas LMS']
  },
  {
    id: '3',
    position: 'Technical Artist',
    company: 'Chant Newall Development Group, LLC',
    startDate: '2017-11',
    endDate: '2021-08',
    description: 'Specialized in 3D, 2D, and audio content creation, developed custom shaders and animations for Unity Engine, automated tasks in Blender, Unity, and 3DS Max, and engaged in client consultation and design meetings.',
    skills: ['Unity', 'Blender', '3DS Max', '3D Graphics', 'Animation', 'Client Consultation']
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
    gpa: '3.81'
  },
  {
    id: '2',
    institution: 'Clovis Community College',
    degree: "Associate's Degrees & Certificate",
    field: 'Multiple: Information Systems (Networking & Web Programming), Cyber Security, Business Administration',
    startDate: '2021',
    endDate: '2023',
    gpa: '3.958'
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