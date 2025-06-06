
"use client";
import Link from 'next/link';
import { UserCircle, FolderGit2, Heart } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { siteTranslations } from '@/data/portfolio-data';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation'; // Not strictly needed for #hash links, but good practice
import { useEffect, useState } from 'react';

const BottomNavigationBar = () => {
  const { language, translations } = useLanguage();
  const navTranslations = translations.navigation || siteTranslations.navigation;
  const [activeSection, setActiveSection] = useState('profile');

  const navItems = [
    { id: 'profile', labelKey: 'profile', Icon: UserCircle },
    { id: 'projects', labelKey: 'projects', Icon: FolderGit2 },
    { id: 'interests', labelKey: 'interests', Icon: Heart },
  ];

  // Simplified active section detection for bottom nav
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = 'profile'; // Default
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is somewhat visible (top part in viewport, or middle)
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = item.id;
            break;
          }
           // If near top and no other section is "middle" visible
          if (rect.top >= 0 && rect.top < window.innerHeight / 3) {
             currentSection = item.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);


  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId); // Immediately set active for better UX
    }
  };
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg rounded-t-xl z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ id, labelKey, Icon }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            aria-label={navTranslations[labelKey]?.[language] || labelKey}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 p-2 rounded-md transition-colors w-1/3",
              activeSection === id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon size={22} className={cn(activeSection === id ? 'opacity-100' : 'opacity-75')} />
            <span className="text-xs font-medium">
              {navTranslations[labelKey]?.[language] || labelKey}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigationBar;
