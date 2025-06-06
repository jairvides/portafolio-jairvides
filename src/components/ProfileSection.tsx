
"use client";
import { profileData, siteTranslations } from '@/data/portfolio-data';
import { useLanguage } from '@/hooks/use-language';
import Section from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap, Code, Languages as LanguagesIcon, UserCircle } from 'lucide-react';

const ProfileSection = () => {
  const { language, translations } = useLanguage();
  const content = profileData;
  const sectionTitles = translations.sections || siteTranslations.sections;

  return (
    <Section id="profile" className="pt-12 md:pt-16 lg:pt-20">
      <div className="space-y-8 max-w-3xl mx-auto"> {/* Max width for content cards */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-2xl text-primary">
              <UserCircle className="mr-3 h-6 w-6" />
              {sectionTitles.profileTitle[language]}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/90 space-y-4">
            <p>{content.aboutMe[language]}</p>
            <h3 className="font-headline text-xl font-semibold text-primary pt-2">{sectionTitles.professionalSummaryTitle[language]}</h3>
            <p>{content.professionalSummary[language]}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-2xl text-primary">
              <Code className="mr-3 h-6 w-6" />
              {sectionTitles.skillsTitle[language]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="text-lg font-semibold mb-2 text-foreground/90">{sectionTitles.technicalSkillsTitle[language]}</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {content.technicalSkills.map(skill => (
                <Badge key={skill[language]} variant="secondary" className="text-sm">{skill[language]}</Badge>
              ))}
            </div>
            <h4 className="text-lg font-semibold mb-2 text-foreground/90">{sectionTitles.softSkillsTitle[language]}</h4>
            <div className="flex flex-wrap gap-2">
              {content.softSkills.map(skill => (
                <Badge key={skill[language]} variant="secondary" className="text-sm">{skill[language]}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-2xl text-primary">
              <LanguagesIcon className="mr-3 h-6 w-6" />
              {sectionTitles.languagesTitle[language]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {content.languages.map(lang => (
                <li key={lang.name[language]} className="text-foreground/90">
                  <span className="font-semibold">{lang.name[language]}:</span> {lang.level[language]}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-2xl text-primary">
               <Briefcase className="mr-3 h-6 w-6" />
              {sectionTitles.experienceTitle[language]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {content.workExperience.map((exp, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-foreground/90">{exp.role[language]}</h4>
                <p className="text-sm text-muted-foreground">{exp.company[language]} | {exp.period[language]}</p>
                <p className="mt-1 text-foreground/80">{exp.description[language]}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-2xl text-primary">
              <GraduationCap className="mr-3 h-6 w-6" />
              {sectionTitles.educationTitle[language]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.education.map((edu, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-foreground/90">{edu.degree[language]}</h4>
                <p className="text-sm text-muted-foreground">{edu.institution} - {edu.year}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default ProfileSection;
