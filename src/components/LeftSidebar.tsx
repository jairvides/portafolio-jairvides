
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Briefcase } from 'lucide-react'; // Assuming Briefcase for a generic portfolio link if needed
import { profileData, siteTranslations } from '@/data/portfolio-data';
import { useLanguage } from '@/hooks/use-language';
import LanguageToggle from './LanguageToggle';
import { cn } from '@/lib/utils';

const LeftSidebar = () => {
  const { language, translations } = useLanguage();
  const navTranslations = translations.navigation || siteTranslations.navigation;
  const [activeSection, setActiveSection] = useState('profile');

  const name = profileData.fullName;
  const title = profileData.title[language];
  const tagline = profileData.professionalSummary[language].substring(0, 100) + "..."; // Short tagline

  const navItems = [
    { id: 'profile', labelKey: 'profile' },
    { id: 'projects', labelKey: 'projects' },
    { id: 'interests', labelKey: 'interests' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.4, // 40% of the section is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = navItems.map(item => document.getElementById(item.id));

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [navItems]);


  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-full flex-col justify-between bg-primary p-6 text-primary-foreground shadow-lg transition-transform duration-300 md:w-1/3 lg:w-[30%] xl:w-1/4 md:translate-x-0">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="font-headline text-4xl lg:text-5xl font-bold">
            {name}
          </h1>
          <p className="text-lg lg:text-xl text-primary-foreground/80">
            {title}
          </p>
          <p className="mt-4 text-sm text-primary-foreground/70">
            {tagline}
          </p>
        </div>

        <nav>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "group flex items-center space-x-3 text-sm font-medium uppercase tracking-wider transition-colors hover:text-accent",
                    activeSection === item.id ? "text-accent" : "text-primary-foreground/70"
                  )}
                >
                  <span className={cn(
                    "block h-px w-8 bg-current transition-all duration-300 group-hover:w-16",
                     activeSection === item.id ? "w-16 bg-accent" : "bg-primary-foreground/70"
                  )}></span>
                  <span>{navTranslations[item.labelKey]?.[language] || item.labelKey}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="space-y-6">
        <div className="flex space-x-4">
          {profileData.contact?.githubUrl && (
            <Link href={profileData.contact.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-primary-foreground/70 hover:text-accent transition-colors">
              <Github size={24} />
            </Link>
          )}
          {profileData.contact?.linkedinUrl && (
            <Link href={profileData.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-primary-foreground/70 hover:text-accent transition-colors">
              <Linkedin size={24} />
            </Link>
          )}
           {/* You can add more social links here if they exist in profileData.contact */}
        </div>
        <LanguageToggle />
      </div>
    </aside>
  );
};

export default LeftSidebar;
