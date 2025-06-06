
"use client";
import type { ReactNode } from 'react';
import Image from 'next/image';
import type { ProfileData, InterestsData, TranslatableContent } from '@/data/portfolio-data';
import type { Language } from '@/contexts/LanguageContext';
import { 
  UserCircle, Briefcase, GraduationCap, LanguagesIcon, Star, Heart, 
  Phone, Mail, Globe, MapPin, CheckCircle2, Settings2, Cpu
} from 'lucide-react';

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
  const contactLabels = { // Simplified for PDF, assuming basic contact info existence.
      phone: {es: "Teléfono", en: "Phone"},
      email: {es: "Correo", en: "Email"},
      website: {es: "Sitio Web", en: "Website"},
      location: {es: "Ubicación", en: "Location"},
  };

  // Placeholder contact details if not in profileData
  const contactDetails = {
    phone: profile.contact?.phone || "+01234 567 890",
    email: profile.contact?.email || "yourmail@example.com",
    website: profile.contact?.website || "yourwebsite.com",
    location: profile.location || "City, Country"
  };
  

  return (
    <div className="bg-white shadow-lg w-[210mm] min-h-[297mm] p-0 flex font-sans"> {/* A4 dimensions approx for rendering */}
      {/* Left Column */}
      <div className="w-1/3 bg-blue-700 text-white p-6 space-y-6">
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white mb-4 shadow-md">
            <Image 
              src={profile.profilePictureUrl} 
              alt={profile.fullName} 
              width={144} 
              height={144} 
              className="object-cover"
              data-ai-hint={profile.dataAiHint}
            />
          </div>
          <h2 className="text-2xl font-headline font-bold text-center">{profile.fullName}</h2>
          <p className="text-blue-200 text-sm text-center">{getTranslation(profile.title)}</p>
        </div>

        <div>
          <LeftSectionTitle icon={<UserCircle size={20} />} title={contactLabels.location[language]} />
          <div className="space-y-2 text-sm">
            <p className="flex items-center"><MapPin size={14} className="mr-2 flex-shrink-0" /> {contactDetails.location}</p>
            <p className="flex items-center"><Phone size={14} className="mr-2 flex-shrink-0" /> {contactDetails.phone}</p>
            <p className="flex items-center"><Mail size={14} className="mr-2 flex-shrink-0" /> {contactDetails.email}</p>
            <p className="flex items-center"><Globe size={14} className="mr-2 flex-shrink-0" /> {contactDetails.website}</p>
          </div>
        </div>
        
        <div>
          <LeftSectionTitle 
            icon={<Cpu size={20} />} 
            title={sectionTitles.skillsTitle?.[language] || "Habilidades"} 
          />
          <div className="text-sm space-y-1 mb-3">
            <h4 className="font-semibold text-blue-100 mb-1">{sectionTitles.technicalSkillsTitle?.[language] || "Técnicas"}</h4>
            {profile.technicalSkills.map((skill, i) => (
              <p key={`tech-${i}`}>{getTranslation(skill)}</p>
            ))}
          </div>
          <div className="text-sm space-y-1">
            <h4 className="font-semibold text-blue-100 mb-1">{sectionTitles.softSkillsTitle?.[language] || "Blandas"}</h4>
            {profile.softSkills.map((skill, i) => (
              <p key={`soft-${i}`}>{getTranslation(skill)}</p>
            ))}
          </div>
        </div>

        <div>
          <LeftSectionTitle 
            icon={<Heart size={20} />} 
            title={sectionTitles.interestsTitle?.[language] || interests.title[language] }
          />
          <ul className="space-y-1 text-sm">
            {interests.items.map((item, i) => (
              <li key={`interest-${i}`} className="flex items-start">
                <CheckCircle2 size={14} className="mr-2 mt-1 flex-shrink-0 text-blue-300" />
                <span>{getTranslation(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-8 space-y-8 bg-white text-gray-700">
        <div>
          <SectionTitle 
            icon={<UserCircle size={24} />} 
            title={sectionTitles.profileTitle?.[language] || "Sobre Mí"} 
          />
          <p className="text-sm leading-relaxed">{getTranslation(profile.aboutMe)}</p>
          
          <h4 className="text-lg font-headline font-semibold text-blue-600 mt-4 mb-2">{sectionTitles.professionalSummaryTitle?.[language] || "Resumen Profesional"}</h4>
          <p className="text-sm leading-relaxed">{getTranslation(profile.professionalSummary)}</p>
        </div>

        <div>
          <SectionTitle 
            icon={<Briefcase size={24} />} 
            title={sectionTitles.experienceTitle?.[language] || "Experiencia Laboral"} 
          />
          <div className="space-y-4">
            {profile.workExperience.map((exp, i) => (
              <div key={`exp-${i}`}>
                <h4 className="text-md font-semibold text-gray-800">{getTranslation(exp.role)}</h4>
                <p className="text-xs text-gray-500 mb-1">{getTranslation(exp.company)} | {getTranslation(exp.period)}</p>
                <p className="text-sm leading-relaxed">{getTranslation(exp.description)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle 
            icon={<GraduationCap size={24} />} 
            title={sectionTitles.educationTitle?.[language] || "Formación Académica"} 
          />
          <div className="space-y-3">
            {profile.education.map((edu, i) => (
              <div key={`edu-${i}`}>
                <h4 className="text-md font-semibold text-gray-800">{getTranslation(edu.degree)}</h4>
                <p className="text-xs text-gray-500">{edu.institution} - {edu.year}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle 
            icon={<LanguagesIcon size={24} />} 
            title={sectionTitles.languagesTitle?.[language] || "Idiomas"} 
          />
          <ul className="space-y-1 text-sm">
            {profile.languages.map((lang, i) => (
              <li key={`lang-${i}`}>
                <span className="font-semibold">{getTranslation(lang.name)}:</span> {getTranslation(lang.level)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PdfCvLayout;
