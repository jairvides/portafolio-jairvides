
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Download, FileText } from 'lucide-react';
import { profileData, interestsData, siteTranslations } from '@/data/portfolio-data';
import { useLanguage } from '@/hooks/use-language';
import LanguageToggle from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Imports for PDF generation
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PdfCvLayout from './PdfCvLayout'; // Assuming this is correctly structured for PDF
import ReactDOM from 'react-dom/client';
import {createElement} from 'react';


const LeftSidebar = () => {
  const { language, translations } = useLanguage();
  const navTranslations = translations.navigation || siteTranslations.navigation;
  const buttonLabels = translations.buttons || siteTranslations.buttons;
  const [activeSection, setActiveSection] = useState('profile');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const nameParts = profileData.fullName.split(' ');
  const firstNameLine = nameParts.slice(0, 2).join(' ');
  const lastNameLine = nameParts.slice(2).join(' ');

  const title = profileData.title[language];
  const tagline = profileData.professionalSummary[language].substring(0, 120) + "...";

  const navItems = [
    { id: 'profile', labelKey: 'profile' },
    { id: 'projects', labelKey: 'projects' },
    { id: 'interests', labelKey: 'interests' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3, 
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

  const handleExportPdf = async () => {
    setIsGeneratingPdf(true);
    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px'; 
    pdfContainer.style.width = '210mm'; 
    pdfContainer.style.height = '297mm'; // Enforce A4 height
    pdfContainer.style.overflow = 'hidden'; // Hide overflow
    document.body.appendChild(pdfContainer);

    const root = ReactDOM.createRoot(pdfContainer);
    
    // Ensure translations are loaded for PdfCvLayout
    const currentTranslations = translations.navigation ? translations : await (async () => {
        const dataModule = await import('@/data/portfolio-data');
        return dataModule.siteTranslations;
    })();
    
    root.render(
      createElement(PdfCvLayout, {
        profile: profileData,
        interests: interestsData,
        language: language,
        translations: currentTranslations
      })
    );
    
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: pdfContainer.offsetWidth,
        height: pdfContainer.offsetHeight, 
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CV_${profileData.fullName.replace(/\s/g, '_')}_${language.toUpperCase()}.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      root.unmount();
      document.body.removeChild(pdfContainer);
      setIsGeneratingPdf(false);
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-full flex-col justify-between bg-primary p-6 text-primary-foreground shadow-lg transition-transform duration-300 md:w-1/3 lg:w-[30%] xl:w-1/4 md:translate-x-0">
      <div className="flex flex-col space-y-6 items-center md:items-start text-center md:text-left">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-2 border-primary-foreground/50 mb-4">
            <Image
                src={profileData.profilePictureUrl}
                alt={profileData.fullName}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                data-ai-hint={profileData.dataAiHint}
            />
        </div>
        <div>
          <h1 className="font-headline text-3xl lg:text-4xl font-bold leading-tight">
            {firstNameLine} <br /> {lastNameLine}
          </h1>
          <p className="text-md lg:text-lg text-primary-foreground/80 mt-1">
            {title}
          </p>
          <p className="mt-3 text-xs text-primary-foreground/70 max-w-xs">
            {tagline}
          </p>
        </div>

        <Button onClick={handleExportPdf} variant="secondary" className="w-full md:w-auto group mt-4" disabled={isGeneratingPdf}>
            {isGeneratingPdf ? (buttonLabels.exportPdf[language].replace(/Exportar|Export/, language === 'es' ? "Generando..." : "Generating...") || "Generating...") : buttonLabels.exportPdf[language]}
            {!isGeneratingPdf && <Download className="ml-2 h-4 w-4 group-hover:animate-bounce" />}
            {isGeneratingPdf && <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-background"></span>}
        </Button>
        
        <nav className="mt-4 w-full">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "group flex items-center space-x-3 text-xs font-medium uppercase tracking-wider transition-colors hover:text-accent",
                    activeSection === item.id ? "text-accent" : "text-primary-foreground/70"
                  )}
                >
                  <span className={cn(
                    "block h-px transition-all duration-300 group-hover:w-12",
                     activeSection === item.id ? "w-12 bg-accent" : "w-6 bg-primary-foreground/70"
                  )}></span>
                  <span>{navTranslations[item.labelKey]?.[language] || item.labelKey}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="space-y-4 items-center flex flex-col md:items-start">
        <div className="flex space-x-4">
          {profileData.contact?.githubUrl && (
            <Link href={profileData.contact.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-primary-foreground/70 hover:text-accent transition-colors">
              <Github size={20} />
            </Link>
          )}
          {profileData.contact?.linkedinUrl && (
            <Link href={profileData.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-primary-foreground/70 hover:text-accent transition-colors">
              <Linkedin size={20} />
            </Link>
          )}
        </div>
        <LanguageToggle />
      </div>
    </aside>
  );
};

export default LeftSidebar;
