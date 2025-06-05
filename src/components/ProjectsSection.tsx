
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { projectsData, siteTranslations } from '@/data/portfolio-data';
import { useLanguage } from '@/hooks/use-language';
import Section from './Section';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FolderGit2 } from 'lucide-react';

const ProjectsSection = () => {
  const { language, translations } = useLanguage();
  const content = projectsData;
  const sectionTitles = translations.sections || siteTranslations.sections;
  const buttonLabels = translations.buttons || siteTranslations.buttons;

  return (
    <Section id="projects">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
        {sectionTitles.projectsTitle[language]}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.map((project, index) => (
          <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full h-48 md:h-56">
              <Image
                src={project.imageUrl}
                alt={project.name[language]}
                layout="fill"
                objectFit="cover"
                data-ai-hint={project.dataAiHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">{project.name[language]}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-foreground/80 mb-4">{project.description[language]}</CardDescription>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full group">
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.link.includes('github.com') ? buttonLabels.viewRepo[language] : buttonLabels.viewProject[language]}
                  {project.link.includes('github.com') ? <FolderGit2 className="ml-2 h-4 w-4 group-hover:animate-pulse" /> : <ExternalLink className="ml-2 h-4 w-4 group-hover:animate-pulse" />}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default ProjectsSection;
