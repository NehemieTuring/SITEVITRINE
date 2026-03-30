import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Globe, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, language, setLanguage } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: t('common.nav.home'), path: '/' },
    { name: t('common.nav.services'), path: '/services' },

    { name: t('common.nav.training'), path: '/training' },

    { name: t('common.nav.about'), path: '/about' },
    { name: t('common.nav.contact'), path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <header 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled 
            ? "bg-background/80 backdrop-blur-md shadow-md py-4" 
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-3 group">
            <img 
              src="/assets/logo.jpeg" 
              alt="WIN CONCEPT INDUSTRY" 
              className="h-12 w-12 object-contain transition-transform group-hover:scale-105 rounded-lg"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-serif font-black tracking-widest text-brand uppercase">WIN CONCEPT</span>
              <span className="text-xs font-bold tracking-[0.2em] text-foreground/70 uppercase">INDUSTRY</span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors hover:text-brand",
                  isActive ? "text-brand" : "text-foreground"
                )}
              >
                {item.name}
              </NavLink>
            ))}
            
            <div className="flex items-center space-x-4 ml-4">
              {/* Language Switcher */}
              <button 
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle language"
              >
                <div className="flex items-center space-x-1">
                   <Globe size={18} />
                   <span className="text-xs font-bold uppercase">{language}</span>
                </div>
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted transition-colors relative h-10 w-10 flex items-center justify-center overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {theme === 'light' ? (
                    <motion.div
                      key="sun"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-background border-t overflow-hidden"
            >
              <div className="container mx-auto px-4 py-8 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => cn(
                      "text-lg font-medium py-2 transition-colors",
                      isActive ? "text-brand" : "text-foreground"
                    )}
                  >
                    {item.name}
                  </NavLink>
                ))}
                <div className="pt-4 flex items-center space-x-6">
                   <button 
                    onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                    className="flex items-center space-x-2 text-sm font-medium"
                   >
                     <Globe size={18} />
                     <span>{language === 'fr' ? t('ui.lang_en') : t('ui.lang_fr')}</span>
                   </button>
                   <button 
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 text-sm font-medium"
                   >
                     {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                     <span>{theme === 'light' ? t('ui.dark_mode') : t('ui.light_mode')}</span>
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-24">
        {children}
      </main>

      <footer className="bg-secondary text-white dark:bg-black py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/assets/logo.jpeg" alt="WIN CONCEPT INDUSTRY Logo" className="h-14 w-14 object-contain rounded-lg" />
                <h2 className="text-xl font-serif font-bold tracking-tighter text-brand leading-tight">WIN CONCEPT<br/>INDUSTRY</h2>
              </div>
              <p className="text-white/70 max-w-sm mb-6">
                {t('common.footer.description')}
              </p>
              <div className="space-y-4 text-sm text-white/90 font-bold">
                 <div className="flex items-center space-x-3 group">
                    <MapPin size={18} className="text-brand" />
                    <span className="group-hover:text-brand transition-colors">{t('contact.info.address')}</span>
                 </div>
                 <a href="tel:+237656422854" className="flex items-center space-x-3 group">
                    <Phone size={18} className="text-brand" />
                    <span className="group-hover:text-brand transition-colors">{t('contact.info.phone')}</span>
                 </a>
                 <a href="mailto:kibino81@gmail.com" className="flex items-center space-x-3 group">
                    <Mail size={18} className="text-brand" />
                    <span className="group-hover:text-brand transition-colors">{t('contact.info.email_addr')}</span>
                 </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t('common.nav.services')}</h3>
              <ul className="space-y-2">
                {navItems.slice(1, 5).map(item => (
                  <li key={item.path}><NavLink to={item.path} className="text-white/60 hover:text-white hover:underline transition-colors">{item.name}</NavLink></li>
                ))}
              </ul>
            </div>

          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
            &copy; {new Date().getFullYear()} {t('common.footer.studio')}. {t('common.footer.rights')}.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
