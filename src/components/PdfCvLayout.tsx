
"use client";
import type { ReactNode } from 'react';
import Image from 'next/image';
import type { ProfileData, InterestsData, TranslatableContent } from '@/data/portfolio-data';
import type { Language } from '@/contexts/LanguageContext';
import { 
  UserCircle, Briefcase, GraduationCap, Languages as LanguagesIcon, Star, Heart, 
  Phone, Mail, Globe, MapPin, CheckCircle2, Settings2, Cpu, Award
} from 'lucide-react'; 

interface PdfCvLayoutProps {
  profile: ProfileData;
  interests: InterestsData;
  language: Language;
  translations: any;
}

const SectionTitle = ({ icon, title }: { icon: ReactNode, title: string }) => (
  <div className="flex items-center mb-2"> {/* Reduced margin */}
    <span className="text-blue-500 mr-2">{icon}</span> {/* Reduced margin */}
    <h3 className="text-lg font-headline font-semibold text-blue-600">{title}</h3> {/* Reduced font size */}
  </div>
);

const LeftSectionTitle = ({ icon, title }: { icon: ReactNode, title: string }) => (
  <div className="flex items-center mb-2"> {/* Reduced margin */}
    <span className="text-white mr-2">{icon}</span> {/* Reduced margin */}
    <h3 className="text-lg font-headline font-semibold text-white">{title}</h3> {/* Reduced font size */}
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

  const getShortInterestText = (items: TranslatableContent[]): string => {
    return items.map(item => {
      const fullText = getTranslation(item);
      const firstClause = fullText.split(/[,.]/)[0]; // Split by comma or period and take the first part
      return firstClause.trim();
    }).join(', ');
  };
  

  return (
    <div className="bg-white shadow-lg w-[210mm] h-[297mm] p-0 flex font-sans text-xs overflow-hidden"> {/* Explicit height and overflow-hidden */}
      {/* Left Column */}
      <div className="w-1/3 bg-blue-700 text-white p-3 space-y-3"> {/* Reduced padding and space */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white mb-2 shadow-sm"> {/* Smaller image, reduced margin */}
            <Image 
              src={profile.profilePictureUrl} 
              alt={profile.fullName} 
              width={112} 
              height={112} 
              className="object-cover"
              data-ai-hint={profile.dataAiHint}
            />
          </div>
          <h2 className="text-lg font-headline font-bold text-center mb-0.5">{profile.fullName}</h2> {/* Reduced font size and margin */}
          <p className="text-blue-200 text-[10px] text-center">{getTranslation(profile.title)}</p> {/* Smaller text */}
        </div>

        <div>
          <LeftSectionTitle icon={<MapPin size={16} />} title={contactLabels.location[language]} /> {/* Smaller Icon */}
          <div className="space-y-0.5 text-[10px]"> {/* Reduced space, smaller text */}
            <p className="flex items-center"><MapPin size={10} className="mr-1 flex-shrink-0" /> {contactDetails.location}</p>
            <p className="flex items-center"><Phone size={10} className="mr-1 flex-shrink-0" /> {contactDetails.phone}</p>
            <p className="flex items-center"><Mail size={10} className="mr-1 flex-shrink-0" /> {contactDetails.email}</p>
            <p className="flex items-center"><Globe size={10} className="mr-1 flex-shrink-0" /> {contactDetails.website}</p>
          </div>
        </div>
        
        <div>
          <LeftSectionTitle 
            icon={<Cpu size={16} />} 
            title={sectionTitles.skillsTitle?.[language] || "Habilidades"} 
          />
          <div className="text-[10px] space-y-0.5 mb-1"> {/* Reduced margin */}
            <h4 className="font-semibold text-blue-100 mb-0.5 text-xs">{sectionTitles.technicalSkillsTitle?.[language] || "Técnicas"}</h4>
            <p>{profile.technicalSkills.map(skill => getTranslation(skill)).join(', ')}</p>
          </div>
          <div className="text-[10px] space-y-0.5">
            <h4 className="font-semibold text-blue-100 mb-0.5 text-xs">{sectionTitles.softSkillsTitle?.[language] || "Blandas"}</h4>
            <p>{profile.softSkills.map(skill => getTranslation(skill)).join(', ')}</p>
          </div>
        </div>
        
        <div>
          <LeftSectionTitle 
            icon={<LanguagesIcon size={16} />} 
            title={sectionTitles.languagesTitle?.[language] || "Idiomas"} 
          />
          <ul className="space-y-0 text-[10px]"> {/* Reduced space */}
            {profile.languages.map((lang, i) => (
              <li key={`lang-${i}`}>
                <span className="font-semibold">{getTranslation(lang.name)}:</span> {getTranslation(lang.level)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <LeftSectionTitle 
            icon={<Heart size={16} />} 
            title={sectionTitles.interestsTitle?.[language] || interests.title[language] }
          />
          <p className="text-[10px] leading-snug"> {/* Adjusted leading */}
            {getShortInterestText(interests.items)}
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-4 space-y-3 bg-white text-gray-700"> {/* Reduced padding and space */}
        <div>
          <SectionTitle 
            icon={<UserCircle size={20} />} 
            title={sectionTitles.profileTitle?.[language] || "Sobre Mí"} 
          />
          <p className="text-[10px] leading-tight">{getTranslation(profile.aboutMe)}</p> {/* Reduced leading */}
          
          <h4 className="text-base font-headline font-semibold text-blue-600 mt-2 mb-1">{sectionTitles.professionalSummaryTitle?.[language] || "Resumen Profesional"}</h4> {/* Reduced margins & font size */}
          <p className="text-[10px] leading-tight">{getTranslation(profile.professionalSummary)}</p>
        </div>

        <div>
          <SectionTitle 
            icon={<Briefcase size={20} />} 
            title={sectionTitles.experienceTitle?.[language] || "Experiencia Laboral"} 
          />
          <div className="space-y-2"> {/* Reduced space */}
            {profile.workExperience.map((exp, i) => (
              <div key={`exp-${i}`}>
                <h4 className="text-xs font-semibold text-gray-800 mb-0">{getTranslation(exp.role)}</h4> {/* Reduced margin */}
                <p className="text-[9px] text-gray-500 mb-0.5">{getTranslation(exp.company)} | {getTranslation(exp.period)}</p> {/* Smaller text, reduced margin */}
                <p className="text-[10px] leading-tight">{getTranslation(exp.description)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle 
            icon={<GraduationCap size={20} />} 
            title={sectionTitles.educationTitle?.[language] || "Formación Académica"} 
          />
          <div className="space-y-1"> {/* Reduced space */}
            {profile.education.map((edu, i) => (
              <div key={`edu-${i}`}>
                <h4 className="text-xs font-semibold text-gray-800 mb-0">{getTranslation(edu.degree)}</h4>
                <p className="text-[9px] text-gray-500">{edu.institution} - {edu.year}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PdfCvLayout;
