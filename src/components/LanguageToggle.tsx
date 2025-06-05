
"use client";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/use-language";
import { Sun, Moon } from 'lucide-react'; // Example icons

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(lang => (lang === 'es' ? 'en' : 'es'));
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="language-toggle" className="text-sm">
        {language === 'es' ? 'EN' : 'ES'}
      </Label>
      <Switch
        id="language-toggle"
        checked={language === 'en'}
        onCheckedChange={toggleLanguage}
        aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      />
    </div>
  );
};

export default LanguageToggle;
