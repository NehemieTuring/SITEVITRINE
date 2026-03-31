import React from 'react';
import { motion } from 'framer-motion';
import { History, Target, Users, Layout } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    { icon: <History />, title: t('about.values.history.title'), text: t('about.values.history.text') },
    { icon: <Target />, title: t('about.values.mission.title'), text: t('about.values.mission.text') },
    { icon: <Users />, title: t('about.values.team.title'), text: t('about.values.team.text') },
    { icon: <Layout />, title: t('about.values.studios.title'), text: t('about.values.studios.text') },
  ];

  return (
    <div className="container mx-auto px-4 py-24 space-y-24">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl lg:text-7xl font-serif font-black tracking-tighter text-gradient leading-tight">
           {t('about.title')}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
           {t('about.subtitle')}
        </p>
      </div>

      <div className="relative h-[60vh] rounded-[3rem] overflow-hidden group shadow-2xl">
         <img 
           src="/assets/services/music-studio.jpg" 
           alt="Studio" 
           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
         />
         <div className="absolute inset-0 bg-brand/30 mix-blend-multiply" />
         <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-6xl lg:text-8xl font-serif font-black text-white/20 tracking-widest uppercase">{t('about.studio_tag')}</h2>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
         {values.map((v, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             viewport={{ once: true }}
             className="space-y-6 p-8 bg-card border border-border rounded-3xl"
           >
              <div className="w-16 h-16 bg-brand text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
                 {React.cloneElement(v.icon as any, { size: 32 })}
              </div>
              <h3 className="text-2xl font-serif font-bold tracking-tight">{v.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.text}</p>
           </motion.div>
         ))}
      </div>
    </div>
  );
};

export default About;
