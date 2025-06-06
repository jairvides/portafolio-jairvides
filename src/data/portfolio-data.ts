
export interface TranslatableContent {
  es: string;
  en: string;
}

export interface Skill {
  name: string;
  icon?: React.ComponentType<{ className?: string }>; // Optional: for Lucide icons
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  githubUrl?: string; // Added for social links
  linkedinUrl?: string; // Added for social links
}

export interface ProfileData {
  fullName: string;
  title: TranslatableContent;
  location: string;
  profilePictureUrl: string;
  dataAiHint: string;
  aboutMe: TranslatableContent;
  professionalSummary: TranslatableContent;
  technicalSkills: TranslatableContent[];
  softSkills: TranslatableContent[];
  languages: Array<{ name: TranslatableContent; level: TranslatableContent }>;
  workExperience: Array<{
    role: TranslatableContent;
    company: TranslatableContent; 
    period: TranslatableContent;
    description: TranslatableContent;
  }>;
  education: Array<{
    degree: TranslatableContent;
    institution: string; 
    year: string;
  }>;
  contact?: ContactInfo; 
}

export interface Project {
  name: TranslatableContent;
  description: TranslatableContent;
  technologies: string[]; 
  link: string;
  imageUrl: string;
  dataAiHint: string;
}

export interface InterestsData {
  title: TranslatableContent;
  items: TranslatableContent[];
}

export const profileData: ProfileData = {
  fullName: "JAIR ENRIQUE VIDES BERDUGO",
  title: { 
    es: "Tecnólogo en Análisis y Desarrollo de Sistemas de Información",
    en: "Technologist in Analysis and Development of Information Systems" 
  },
  location: "Algarrobo, Colombia",
  profilePictureUrl: "/profile-photo.jpg", 
  dataAiHint: "profile picture",
  aboutMe: {
    es: "Soy oriundo de Colombia, tengo 34 años y me apasiona estar a la vanguardia de la tecnología. Me caracterizo por ser una persona responsable que se adapta fácilmente al ambiente de trabajo. Me encanta el Desarrollo de Aplicaciones Web, el trabajo en equipo es mi fuerte y cuento con experiencia utilizando diversas tecnologías modernas.",
    en: "I am from Colombia, 34 years old, and passionate about being at the forefront of technology. I am a responsible individual who adapts easily to work environments. I love Web Application Development, teamwork is my strength, and I have experience using various modern technologies."
  },
  professionalSummary: {
    es: "Desarrollador Front-End con experiencia en la creación de páginas y aplicaciones web interactivas y responsivas. Apasionado por entregar soluciones innovadoras y eficientes que mejoran la experiencia del usuario. Busco aplicar mis habilidades para contribuir al desarrollo de proyectos desafiantes.",
    en: "Front-End Developer experienced in creating interactive and responsive web pages and applications. Passionate about delivering innovative and efficient solutions that enhance user experience. I seek to apply my skills to contribute to challenging projects."
  },
  contact: { 
    phone: "+57 300 123 4567", 
    email: "jair.vides@example.com", 
    website: "portfolio.example.com",
    githubUrl: "https://github.com/jairvides", // Replace with your actual GitHub URL
    linkedinUrl: "https://linkedin.com/in/jairvides", // Replace with your actual LinkedIn URL
  },
  technicalSkills: [
    { es: "React", en: "React" },
    { es: "JavaScript", en: "JavaScript" },
    { es: "Node.js", en: "Node.js" },
    { es: "Suite de Office", en: "MS Office Suite" },
    { es: "GitHub", en: "GitHub" },
    { es: "Git", en: "Git" },
    { es: "Azure AI", en: "Azure AI" },
    { es: "Tailwind CSS", en: "Tailwind CSS"},
    { es: "HTML5", en: "HTML5"},
    { es: "CSS3", en: "CSS3"},
  ],
  softSkills: [
    { es: "Liderazgo", en: "Leadership" },
    { es: "Trabajo en Equipo", en: "Teamwork" },
    { es: "Comunicación Efectiva", en: "Effective Communication" },
    { es: "Adaptabilidad", en: "Adaptability" },
    { es: "Resolución de Problemas", en: "Problem Solving" },
  ],
  languages: [
    { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
    { name: { es: "Inglés", en: "English" }, level: { es: "A2 (Básico)", en: "A2 (Basic)" } },
  ],
  workExperience: [
    { 
      role: { es: "Desarrollador Web Freelance", en: "Freelance Web Developer" },
      company: { es: "Proyectos Propios", en: "Personal Projects" },
      period: { es: "2022 - Presente", en: "2022 - Present" },
      description: { 
        es: "Diseño y desarrollo de una aplicación web para la gestión y entrega de calificaciones académicas para una institución educativa, optimizando procesos y mejorando la comunicación.",
        en: "Designed and developed a web application for managing and delivering academic grades for an educational institution, optimizing processes and improving communication." 
      } 
    },
    { 
      role: { es: "Desarrollador Web Freelance", en: "Freelance Web Developer" },
      company: { es: "Proyectos Propios", en: "Personal Projects" },
      period: { es: "2021 - 2022", en: "2021 - 2022" },
      description: { 
        es: "Creación de una tienda virtual completa para un pequeño comercio, incluyendo catálogo de productos, carrito de compras y funcionalidades de gestión de pedidos.",
        en: "Created a complete e-commerce web application for a small business, including product catalog, shopping cart, and order management functionalities."
      }
    },
  ],
  education: [
    { 
      degree: { es: "Tecnólogo en Análisis y Desarrollo de Sistemas de Información", en: "Technologist in Analysis and Development of Information Systems" },
      institution: "SENA (Servicio Nacional de Aprendizaje)", 
      year: "2022" 
    },
  ],
};

export const projectsData: Project[] = [
  {
    name: { es: "Clon de Netflix", en: "Netflix Clone" },
    description: { 
      es: "Proyecto personal de clonación de la interfaz de usuario de Netflix, implementando funcionalidades de navegación y visualización de contenido. Incluye inicio de sesión simulado con Auth0 para práctica de autenticación.",
      en: "Personal project cloning the Netflix user interface, implementing content browsing and display functionalities. Includes simulated login with Auth0 for authentication practice."
    },
    technologies: ["React", "JavaScript", "Tailwind CSS", "Node.js", "Auth0"],
    link: "https://github.com/jairvides/alura-netflix",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "streaming interface"
  },
  {
    name: { es: "Sistema de Gestión de Notas", en: "Grade Management System" },
    description: { 
      es: "Aplicación web para instituciones educativas que permite a los docentes registrar notas, y a estudiantes y acudientes consultarlas. Enfocado en la usabilidad y seguridad de datos.",
      en: "Web application for educational institutions allowing teachers to record grades, and students/guardians to consult them. Focused on usability and data security."
    },
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "JWT"],
    link: "https://github.com/jairvides/grade-system", 
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "education dashboard"
  },
  {
    name: { es: "Tienda Virtual 'Mi Bodeguita'", en: "E-commerce 'My Little Store'" },
    description: { 
      es: "Plataforma de e-commerce para un pequeño negocio local, con catálogo de productos, carrito de compras, y un panel de administración básico para gestionar inventario y pedidos.",
      en: "E-commerce platform for a small local business, featuring a product catalog, shopping cart, and a basic admin panel for inventory and order management."
    },
    technologies: ["JavaScript (Vanilla)", "HTML5", "CSS3", "Firebase (Firestore & Auth)"],
    link: "https://github.com/jairvides/simple-ecommerce", 
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "online shop"
  },
];

export const interestsData: InterestsData = {
  title: { es: "Hobbies e Intereses Personales", en: "Personal Hobbies and Interests" },
  items: [
    { 
      es: "Disfruto escuchar música Gospel, ya que me brinda paz e inspiración.", 
      en: "I enjoy listening to Gospel music, as it brings me peace and inspiration." 
    },
    { 
      es: "Ver series y películas, especialmente aquellas que desafían el pensamiento o cuentan historias conmovedoras.", 
      en: "Watching series and movies, especially those that challenge thinking or tell moving stories." 
    },
    { 
      es: "Mantenerme al día con los avances en tecnología y desarrollo de software es una pasión. Constantemente exploro nuevas herramientas, lenguajes y metodologías para expandir mis conocimientos y habilidades como programador.", 
      en: "Keeping up-to-date with advancements in technology and software development is a passion. I constantly explore new tools, languages, and methodologies to expand my knowledge and skills as a programmer." 
    },
    { 
      es: "El tiempo en familia es invaluable; compartir momentos y crear recuerdos con mis seres queridos es fundamental para mi bienestar.", 
      en: "Family time is invaluable; sharing moments and creating memories with my loved ones is fundamental to my well-being." 
    },
    { 
      es: "La lectura y el estudio de la Biblia son una parte integral de mi vida, proporcionándome guía, sabiduría y fortaleza espiritual.", 
      en: "Reading and studying the Bible are an integral part of my life, providing me with guidance, wisdom, and spiritual strength." 
    },
  ],
};

export const siteTranslations = {
  navigation: {
    home: { es: "Inicio", en: "Home" },
    profile: { es: "Perfil", en: "Profile" },
    projects: { es: "Proyectos", en: "Projects" },
    interests: { es: "Intereses", en: "Interests" },
  },
  buttons: {
    exportPdf: { es: "Exportar CV a PDF", en: "Export CV to PDF" },
    backToTop: { es: "Volver Arriba", en: "Back to Top" },
    viewProject: { es: "Ver Proyecto", en: "View Project" },
    viewRepo: { es: "Ver Repositorio", en: "View Repository" },
  },
  sections: {
    profileTitle: { es: "Sobre Mí", en: "About Me" },
    professionalSummaryTitle: { es: "Resumen Profesional", en: "Professional Summary" },
    skillsTitle: { es: "Habilidades", en: "Skills" },
    technicalSkillsTitle: { es: "Técnicas", en: "Technical" },
    softSkillsTitle: { es: "Blandas", en: "Soft Skills" },
    languagesTitle: { es: "Idiomas", en: "Languages" },
    experienceTitle: { es: "Experiencia Laboral", en: "Work Experience" },
    educationTitle: { es: "Formación Académica", en: "Education" },
    projectsTitle: { es: "Proyectos Destacados", en: "Featured Projects" },
    interestsTitle: { es: "Intereses Personales", en: "Personal Interests" },
  },
  footer: {
    copyright: { es: `© ${new Date().getFullYear()} Jair Enrique Vides Berdugo. Todos los derechos reservados.`, en: `© ${new Date().getFullYear()} Jair Enrique Vides Berdugo. All rights reserved.`}
  }
};

