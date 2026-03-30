import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const contactInfos = [
    { icon: <MapPin size={28} />, title: t('contact.info.visit'), text: t('contact.info.address'), href: null },
    { icon: <Phone size={28} />, title: t('contact.info.call'), text: t('contact.info.phone'), href: 'tel:+237656422854' },
    { icon: <Mail size={28} />, title: t('contact.info.email'), text: t('contact.info.email_addr'), href: 'mailto:winconceptindustrystudios@gmail.com' },
  ];

  return (
    <div className="container mx-auto px-4 py-24 min-h-[70vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
        {/* Company Branding & Description */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="flex items-center space-x-6">
            <img 
              src="/assets/logo.jpeg" 
              alt="Logo" 
              className="w-24 h-24 lg:w-32 lg:h-32 object-contain rounded-3xl shadow-2xl border-4 border-brand/20"
            />
            <div className="flex flex-col">
              <h1 className="text-4xl lg:text-6xl font-serif font-black tracking-tighter text-brand uppercase leading-tight">
                WIN CONCEPT
              </h1>
              <span className="text-xl lg:text-2xl font-bold tracking-[0.3em] text-foreground/60 uppercase">
                INDUSTRY
              </span>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gradient leading-tight">
              {t('contact.subtitle')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              {t('common.footer.description')}
            </p>
          </div>
        </motion.div>

        {/* Contact info grid as per user's request to see all footer contact info here */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 gap-6"
        >
          {contactInfos.map((item, i) => {
            const Content = (
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-brand text-white flex items-center justify-center shadow-xl shadow-brand/20 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.text}</p>
                </div>
              </div>
            );

            return item.href ? (
              <a 
                key={i}
                href={item.href}
                className="group p-8 rounded-[2rem] bg-white dark:bg-card border border-border shadow-xl hover:shadow-brand/10 transition-all hover:-translate-y-1 block"
              >
                {Content}
              </a>
            ) : (
              <div 
                key={i}
                className="group p-8 rounded-[2rem] bg-white dark:bg-card border border-border shadow-xl block"
              >
                {Content}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
