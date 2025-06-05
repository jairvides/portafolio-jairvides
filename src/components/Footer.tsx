
"use client";
import { useLanguage } from '@/hooks/use-language';
import { siteTranslations } from '@/data/portfolio-data'; // Assuming copyright is in siteTranslations

const Footer = () => {
  const { language, translations } = useLanguage();
  const footerTranslations = translations.footer || siteTranslations.footer;


  // This effect ensures that copyright year is updated if the component persists across year changes
  // For a typical SSR/SSG build this might not be strictly necessary for initial load.
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  const copyrightText = footerTranslations.copyright[language].replace(
    /\d{4}/, // finds a 4-digit year
    currentYear.toString()
  );


  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 md:px-6 py-6 text-center text-sm text-muted-foreground">
        <p>{copyrightText}</p>
      </div>
    </footer>
  );
};

// Need to import useState and useEffect for dynamic year, if kept.
// For simplicity if dynamic year isn't critical, can remove and hardcode year or use data file's logic.
import { useState, useEffect } from 'react';

export default Footer;
