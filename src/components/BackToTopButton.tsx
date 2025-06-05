
"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { siteTranslations } from '@/data/portfolio-data';
import { cn } from '@/lib/utils';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language, translations } = useLanguage();
  const buttonLabels = translations.buttons || siteTranslations.buttons;

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <Button
      variant="default"
      size="icon"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 rounded-full shadow-lg transition-opacity duration-300 z-50",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label={buttonLabels.backToTop[language]}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};

export default BackToTopButton;
