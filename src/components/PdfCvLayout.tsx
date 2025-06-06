
"use client";
import type { ReactNode } from 'react';
import Image from 'next/image';
import type { ProfileData, InterestsData, TranslatableContent } from '@/data/portfolio-data';
import type { Language } from '@/contexts/LanguageContext';
import { 
  UserCircle, Briefcase, GraduationCap, Languages as LanguagesIcon, Star, Heart, 
  Phone, Mail, Globe, MapPin, CheckCircle2, Settings2, Cpu, Award
} from 'lucide-react'; // Asegúrate que LanguagesIcon se importe correctamente

interface PdfCvLayoutProps {
  profile: ProfileData;
  interests: InterestsData;
  language: Language;
  translations: any;
}

const SectionTitle = ({ icon, title }: { icon: ReactNode, title: string }) => (
  <div className="flex items-center mb-3">
    <span className="text-blue-500 mr-3">{icon}</span>
    <h3 className="text-xl font-headline font-semibold text-blue-600">{title}</h3>
  </div>
);

const LeftSectionTitle = ({ icon, title }: { icon: ReactNode, title: string }) => (
  <div className="flex items-center mb-3">
    <span className="text-white mr-3">{icon}</span>
    <h3 className="text-xl font-headline font-semibold text-white">{title}</h3>
  </div>
);

const PdfCvLayout = ({ profile, interests, language, translations }: PdfCvLayoutProps) => {
  const getTranslation = (content: TranslatableContent): string => {
    return content[language] || content['en']; // Fallback to English
  };
  
  const sectionTitles = translations?.sections || {};
  const contactLabels = { 
      phone: {es: "Teléfono", en: "Phone"},
      email: {es: "Correo", en: "Email"},
      website: {es: "Sitio Web", en: "Website"},
      location: {es: "Ubicación", en: "Location"},
  };

  const contactDetails = {
    phone: profile.contact?.phone || "+01234 567 890",
    email: profile.contact?.email || "yourmail@example.com",
    website: profile.contact?.website || "yourwebsite.com",
    location: profile.location || "City, Country"
  };

  const getShortInterest = (item: TranslatableContent): string => {
    const fullText = getTranslation(item);
    const firstCommaIndex = fullText.indexOf(',');
    if (firstCommaIndex !== -1) {
      return fullText.substring(0, firstCommaIndex);
    }
    // Si no hay coma, podríamos limitar por palabras o caracteres, o devolver completo si es corto.
    // Por ahora, devolvemos completo si no hay coma.
    return fullText; 
  };
  

  return (
    <div className="bg-white shadow-lg w-[210mm] min-h-[297mm] p-0 flex font-sans text-xs"> {/* A4 dimensions approx for rendering, reduced base font size */}
      {/* Left Column */}
      <div className="w-1/3 bg-blue-700 text-white p-4 space-y-4"> {/* Reduced padding and space */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white mb-3 shadow-sm"> {/* Smaller image, border, margin */}
            <Image 
              src={profile.profilePictureUrl} 
              alt={profile.fullName} 
              width={128} 
              height={128} 
              className="object-cover"
              data-ai-hint={profile.dataAiHint}
            />
          </div>
          <h2 className="text-xl font-headline font-bold text-center mb-0.5">{profile.fullName}</h2> {/* Reduced margin */}
          <p className="text-blue-200 text-xs text-center">{getTranslation(profile.title)}</p> {/* Smaller text */}
        </div>

        <div>
          <LeftSectionTitle icon={<MapPin size={18} />} title={contactLabels.location[language]} /> {/* Smaller Icon */}
          <div className="space-y-1 text-xs"> {/* Reduced space, smaller text */}
            <p className="flex items-center"><MapPin size={12} className="mr-1.5 flex-shrink-0" /> {contactDetails.location}</p>
            <p className="flex items-center"><Phone size={12} className="mr-1.5 flex-shrink-0" /> {contactDetails.phone}</p>
            <p className="flex items-center"><Mail size={12} className="mr-1.5 flex-shrink-0" /> {contactDetails.email}</p>
            <p className="flex items-center"><Globe size={12} className="mr-1.5 flex-shrink-0" /> {contactDetails.website}</p>
          </div>
        </div>
        
        <div>
          <LeftSectionTitle 
            icon={<Cpu size={18} />} 
            title={sectionTitles.skillsTitle?.[language] || "Habilidades"} 
          />
          <div className="text-xs space-y-1 mb-2"> {/* Reduced margin */}
            <h4 className="font-semibold text-blue-100 mb-0.5">{sectionTitles.technicalSkillsTitle?.[language] || "Técnicas"}</h4>
            <p>{profile.technicalSkills.map(skill => getTranslation(skill)).join(', ')}</p>
          </div>
          <div className="text-xs space-y-1">
            <h4 className="font-semibold text-blue-100 mb-0.5">{sectionTitles.softSkillsTitle?.[language] || "Blandas"}</h4>
            <p>{profile.softSkills.map(skill => getTranslation(skill)).join(', ')}</p>
          </div>
        </div>
        
        <div>
          <LeftSectionTitle 
            icon={<LanguagesIcon size={18} />} 
            title={sectionTitles.languagesTitle?.[language] || "Idiomas"} 
          />
          <ul className="space-y-0.5 text-xs"> {/* Reduced space */}
            {profile.languages.map((lang, i) => (
              <li key={`lang-${i}`}>
                <span className="font-semibold">{getTranslation(lang.name)}:</span> {getTranslation(lang.level)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <LeftSectionTitle 
            icon={<Heart size={18} />} 
            title={sectionTitles.interestsTitle?.[language] || interests.title[language] }
          />
          <p className="text-xs">
            {interests.items.map(item => getShortInterest(item)).join(', ')}
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-6 space-y-4 bg-white text-gray-700"> {/* Reduced padding and space */}
        <div>
          <SectionTitle 
            icon={<UserCircle size={22} />} 
            title={sectionTitles.profileTitle?.[language] || "Sobre Mí"} 
          />
          <p className="text-xs leading-normal">{getTranslation(profile.aboutMe)}</p> {/* Reduced leading */}
          
          <h4 className="text-lg font-headline font-semibold text-blue-600 mt-3 mb-1.5">{sectionTitles.professionalSummaryTitle?.[language] || "Resumen Profesional"}</h4> {/* Reduced margins */}
          <p className="text-xs leading-normal">{getTranslation(profile.professionalSummary)}</p>
        </div>

        <div>
          <SectionTitle 
            icon={<Briefcase size={22} />} 
            title={sectionTitles.experienceTitle?.[language] || "Experiencia Laboral"} 
          />
          <div className="space-y-3"> {/* Reduced space */}
            {profile.workExperience.map((exp, i) => (
              <div key={`exp-${i}`}>
                <h4 className="text-sm font-semibold text-gray-800 mb-0">{getTranslation(exp.role)}</h4> {/* Reduced margin */}
                <p className="text-xxs text-gray-500 mb-0.5">{getTranslation(exp.company)} | {getTranslation(exp.period)}</p> {/* Smaller text, reduced margin */}
                <p className="text-xs leading-normal">{getTranslation(exp.description)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle 
            icon={<GraduationCap size={22} />} 
            title={sectionTitles.educationTitle?.[language] || "Formación Académica"} 
          />
          <div className="space-y-2"> {/* Reduced space */}
            {profile.education.map((edu, i) => (
              <div key={`edu-${i}`}>
                <h4 className="text-sm font-semibold text-gray-800 mb-0">{getTranslation(edu.degree)}</h4>
                <p className="text-xxs text-gray-500">{edu.institution} - {edu.year}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// Definición de text-xxs si no existe en Tailwind por defecto
// Esto es más un recordatorio; la clase debe definirse en globals.css o tailwind.config.js si se necesita globalmente
// Para este componente, podríamos usar style={{ fontSize: '0.65rem' }} o similar si es puntual.
// Por ahora, asumiré que una clase como text-xxs sería configurada globalmente o se usarán valores de Tailwind más cercanos.

export default PdfCvLayout;

