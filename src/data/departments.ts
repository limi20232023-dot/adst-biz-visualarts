export interface GalleryImage {
  id: string;
  src: string;
  fallbackSrc?: string;
  caption: string;
  category: string;
}

export interface Teacher {
  id: string;
  src: string;
  fallbackSrc?: string;
  name: string;
  department: 'computer-science' | 'visual-arts' | 'business';
  bio: string;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: 'gold' | 'cyan' | 'purple';
  images: GalleryImage[];
}

export const departments: Department[] = [
  {
    id: 'computer-science',
    name: 'Computer Science',
    icon: 'cpu',
    description: 'Exploring the frontiers of artificial intelligence, quantum computing, and cybersecurity through cutting-edge research and innovative student projects.',
    color: 'cyan',
    images: [
      {
        id: 'cs-1',
        src: '/images/Computer_Science_Photos/1.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        caption: 'Students printing their ideas to life',
        category: '3D Printing'
      },
      {
        id: 'cs-2',
        src: '/images/Computer_Science_Photos/2.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
        caption: 'Quantum Computing Processing Architecture',
        category: 'Quantum'
      },
      {
        id: 'cs-3',
        src: '/images/Computer_Science_Photos/3.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        caption: 'Cybersecurity Threat Analysis Command Center',
        category: 'Security'
      },
      {
        id: 'cs-4',
        src: '/images/Computer_Science_Photos/4.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        caption: 'Data Science & Analytics Visualization Platform',
        category: 'Data Science'
      },
      {
        id: 'cs-5',
        src: '/images/Computer_Science_Photos/5.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
        caption: 'Software Engineering & Cloud Development Studio',
        category: 'Software'
      },
      {
        id: 'cs-6',
        src: '/images/Computer_Science_Photos/6.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
        caption: 'Machine Learning Neural Network Architecture',
        category: 'ML'
      }
    ]
  },
  {
    id: 'visual-arts',
    name: 'Visual Arts',
    icon: 'palette',
    description: 'Celebrating creative expression through digital art, gallery installations, graphic design, and multimedia storytelling.',
    color: 'gold',
    images: [
      {
        id: 'va-1',
        src: '/images/Visual_Arts_Photos/1.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
        caption: 'Digital Art & Contemporary Painting Exhibition',
        category: 'Digital Art'
      },
      {
        id: 'va-2',
        src: '/images/Visual_Arts_Photos/2.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80',
        caption: 'Modern Gallery Installation & Spatial Design',
        category: 'Installation'
      },
      {
        id: 'va-3',
        src: '/images/Visual_Arts_Photos/3.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
        caption: 'Graphic Design & Brand Identity Showcase',
        category: 'Design'
      },
      {
        id: 'va-4',
        src: '/images/Visual_Arts_Photos/4.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
        caption: 'Fine Arts & Mixed Media Sculpture Gallery',
        category: 'Sculpture'
      },
      {
        id: 'va-5',
        src: '/images/Visual_Arts_Photos/5.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
        caption: 'Artistic Photography & Visual Storytelling',
        category: 'Photography'
      },
      {
        id: 'va-6',
        src: '/images/Visual_Arts_Photos/6.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80',
        caption: 'Creative Workshop & Collaborative Studio Space',
        category: 'Studio'
      }
    ]
  },
  {
    id: 'business',
    name: 'Business',
    icon: 'briefcase',
    description: 'Showcasing entrepreneurial innovation, strategic market analysis, leadership excellence, and sustainable business growth.',
    color: 'gold',
    images: [
      {
        id: 'biz-1',
        src: '/images/Business_Photos/1.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
        caption: 'Entrepreneurship & Startup Innovation Hub',
        category: 'Startup'
      },
      {
        id: 'biz-2',
        src: '/images/Business_Photos/2.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        caption: 'Market Analysis & Financial Intelligence Dashboard',
        category: 'Analytics'
      },
      {
        id: 'biz-3',
        src: '/images/Business_Photos/3.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
        caption: 'Leadership Development & Strategic Planning',
        category: 'Leadership'
      },
      {
        id: 'biz-4',
        src: '/images/Business_Photos/4.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        caption: 'Business Strategy & Corporate Growth Workshop',
        category: 'Strategy'
      },
      {
        id: 'biz-5',
        src: '/images/Business_Photos/5.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80',
        caption: 'Global Trade & International Commerce Forum',
        category: 'Trade'
      },
      {
        id: 'biz-6',
        src: '/images/Business_Photos/6.jpg',
        fallbackSrc: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
        caption: 'Executive Management & Professional Excellence',
        category: 'Management'
      }
    ]
  }
];

export const defaultTeachers: Teacher[] = [
  {
    id: 't-cs-1',
    src: '/images/Teachers_Photos/1.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    name: 'Mr.Tsegai Sebatu',
    department: 'computer-science',
    bio: 'Taught: APCSA, APCSP, CS12, CS11, CS10, Calculus12, PC12, PC11, Math10.',
  },
  {
    id: 't-va-1',
    src: '/images/Teachers_Photos/2.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    name: 'Ms. Dorothy Yan',
    department: 'visual-arts',
    bio: 'Taught: AP Biology, Biology 11/12, Psychology, Visual Arts.',
  },
  {
    id: 't-biz-1',
    src: '/images/Teachers_Photos/3.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
    name: 'Ms. Nicole de Jager',
    department: 'business',
    bio: 'AP Macro Economics, AP Micro Economics, Accounting11/12, Economics11/12.',
  },
];
