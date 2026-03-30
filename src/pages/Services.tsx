import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Music, Database, Camera, GraduationCap } from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const categories = [
    {
      id: 'music',
      title: t('services.categories.music'),
      icon: <Music />,
      items: [
        { name: t('services.music.studio') },
        { name: t('services.music.voiceover') },
        { name: t('services.music.spot') },
        { name: t('services.music.mix') },
        { name: t('services.music.recording') },
        { name: t('services.music.ost') },
      ]
    },
    {
      id: 'management',
      title: t('services.categories.management'),
      icon: <Database />,
      items: [
        { name: t('services.management.artist') },
        { name: t('services.management.distribution') },
        { name: t('services.management.marketing') },
        { name: t('services.management.cm') },
        { name: t('services.management.communication') },
        { name: t('services.management.analysis') },
      ]
    },
    {
      id: 'video',
      title: t('services.categories.video'),
      icon: <Camera />,
      items: [
        { name: t('services.video.graphics') },
        { name: t('services.video.photo') },
        { name: t('services.video.realization') },
        { name: t('services.video.script') },
        { name: t('services.video.event') },
        { name: t('services.video.content') },
      ]
    },
    {
      id: 'training',
      title: t('services.categories.training'),
      icon: <GraduationCap />,
      items: [
        { name: t('services.training.all') },
        { name: t('services.training.planning') },
        { name: t('services.training.registration') },
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24 space-y-24">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl lg:text-6xl font-serif font-black mb-6 tracking-tight text-gradient">
          {t('services.title')}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
           {t('services.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {categories.map((category, idx) => (
          <motion.div 
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group p-8 lg:p-12 bg-white dark:bg-card border border-border rounded-[3rem] shadow-xl hover:shadow-accent/10 transition-shadow overflow-hidden relative"
          >
            <div className="flex items-center space-x-6 mb-12">
               <div className="w-20 h-20 bg-brand text-white rounded-3xl flex items-center justify-center p-5 transform group-hover:rotate-6 transition-transform shadow-lg shadow-brand/20">
                  {React.cloneElement(category.icon as any, { size: 40 })}
               </div>
               <h2 className="text-3xl font-serif font-bold tracking-tight">{category.title}</h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {category.items.map((item, idy) => (
                 <li key={idy}>
                    <div className="flex items-center p-4 rounded-2xl bg-muted/20 border border-transparent shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-brand mr-3 opacity-30" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                 </li>
               ))}
            </ul>

            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                {React.cloneElement(category.icon as any, { size: 180 })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Hero in Services Page */}
      <section className="bg-muted py-20 rounded-[3rem] px-8 text-center">
         <h2 className="text-3xl font-serif font-bold mb-6">{t('services.booking.title')}</h2>
         <p className="text-muted-foreground max-w-lg mx-auto mb-10">
           {t('services.booking.subtitle')}
         </p>
         <button className="px-10 py-5 bg-brand text-white font-bold rounded-full hover:bg-brand-dark transition-all shadow-xl hover:shadow-brand/20">
            {t('services.booking.cta')}
         </button>
      </section>
    </div>
  );
};

export default Services;
