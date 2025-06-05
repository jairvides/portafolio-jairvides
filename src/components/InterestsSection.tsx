
"use client";
import { interestsData, siteTranslations } from '@/data/portfolio-data';
import { useLanguage } from '@/hooks/use-language';
import Section from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const InterestsSection = () => {
  const { language, translations } = useLanguage();
  const content = interestsData;
  const sectionTitles = translations.sections || siteTranslations.sections;

  return (
    <Section id="interests" className="bg-secondary/30 dark:bg-secondary/10">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
        {sectionTitles.interestsTitle?.[language] || content.title[language]}
      </h2>
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            <ul className="space-y-4">
              {content.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span className="text-foreground/90">{item[language]}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default InterestsSection;
