
"use client";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { siteTranslations } from '@/data/portfolio-data';
import { Download } from "lucide-react";

const PdfExportButtons = () => {
  const { language, translations } = useLanguage();
  const buttonLabels = translations.buttons || siteTranslations.buttons;

  const handleExport = () => {
    // This is a simplified version. True PDF generation is complex.
    // This will print the current view.
    window.print(); 
  };

  return (
    <div className="mt-6 flex justify-center">
      <Button onClick={handleExport} className="group">
        {buttonLabels.exportPdf[language]}
        <Download className="ml-2 h-4 w-4 group-hover:animate-bounce" />
      </Button>
    </div>
  );
};

export default PdfExportButtons;
