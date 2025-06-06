
"use client";
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/hooks/use-language';
import { CodeXml } from 'lucide-react'; // Or a more suitable logo icon

const Header = () => {
  const { language, translations } = useLanguage();
  const navTranslations = translations.navigation || {};

  const navItems = [
    { href: '#profile', labelKey: 'profile' },
    { href: '#projects', labelKey: 'projects' },
    { href: '#interests', labelKey: 'interests' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <CodeXml className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">Jair.Dev</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map(item => (
            <Link
              key={item.labelKey}
              href={item.href}
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              {navTranslations[item.labelKey]?.[language] || item.labelKey.charAt(0).toUpperCase() + item.labelKey.slice(1)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <LanguageToggle />
          {/* Mobile Menu Trigger (optional, can be added later) */}
        </div>
      </div>
    </header>
  );
};

export default Header;
