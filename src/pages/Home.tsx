import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Music, Video, Database, GraduationCap, Star } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import ImageSlider from '../components/media/ImageSlider';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    { title: t('services.categories.music'), icon: <Music />, color: 'bg-brand' },
    { title: t('services.categories.video'), icon: <Video />, color: 'bg-brand' },
    { title: t('services.categories.management'), icon: <Database />, color: 'bg-brand' },
    { title: t('services.categories.training'), icon: <GraduationCap />, color: 'bg-brand' },
  ];



  return (
    <div className="flex flex-col space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-brand/10 -z-10 overflow-hidden">
           <motion.div 
             animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
             transition={{ duration: 15, repeat: Infinity }}
             className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-brand/20 via-accent/5 to-transparent rounded-full blur-3xl opacity-50" 
           />
           <motion.div 
             animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
             transition={{ duration: 20, repeat: Infinity }}
             className="absolute -bottom-1/2 -right-1/4 w-[150%] h-[150%] bg-gradient-to-tl from-accent/20 via-brand/5 to-transparent rounded-full blur-3xl opacity-50" 
           />
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <span className="mb-4 py-1 px-4 text-xs font-bold uppercase tracking-widest text-brand border border-brand/30 rounded-full">
              {t('common.footer.studio')}
            </span>
            <h1 className="text-5xl lg:text-7xl font-serif font-black mb-6 leading-tight text-brand dark:text-white">
              {t('common.hero.title')}
            </h1>
            <p className="text-lg text-foreground/70 mb-10 max-w-lg leading-relaxed">
              {t('common.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
               <NavLink to="/contact" className="px-8 py-4 bg-brand text-white font-bold rounded-full hover:bg-brand-dark transition-all flex items-center group shadow-xl hover:shadow-brand/20">
                 {t('common.hero.cta')}
                 <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
               </NavLink>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="relative h-full"
          >
             <div className="absolute -inset-4 bg-gradient-to-tr from-brand/30 to-brand-dark/30 rounded-3xl blur-2xl opacity-40 -z-10" />
             <ImageSlider />
          </motion.div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="container mx-auto px-4">
         <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4">{t('common.nav.services')}</h2>
            <div className="h-1.5 w-24 bg-brand mx-auto rounded-full" />
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative p-8 bg-card border border-border rounded-3xl hover:border-brand/50 transition-all shadow-lg overflow-hidden"
              >
                <div className={`w-14 h-14 ${service.color} text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                   {React.cloneElement(service.icon as any, { size: 28 })}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{t('common.services.desc')} {service.title.toLowerCase()}.</p>
                <NavLink to="/services" className="text-brand font-bold text-sm flex items-center group/link">
                   {t('common.buttons.learnMore')} <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </NavLink>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   {React.cloneElement(service.icon as any, { size: 100 })}
                </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Featured Project */}
      <section className="bg-brand py-24 text-white overflow-hidden">
         <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <span className="text-white opacity-80 font-bold tracking-widest text-sm uppercase">Win concept Studio</span>
               <h2 className="text-5xl font-serif font-black leading-tight text-white">{t('common.featured.title')}</h2>
               <p className="text-white/70 text-lg max-w-md">{t('common.featured.description')}</p>
               <ul className="space-y-4">
                  {(t('common.featured.list', { returnObjects: true }) as string[]).map(item => (
                    <li key={item} className="flex items-center space-x-3">
                       <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white">
                          <Star size={12} fill="currentColor" />
                       </div>
                       <span className="font-medium">{item}</span>
                    </li>
                  ))}
               </ul>
               <NavLink to="/contact" className="px-8 py-4 bg-white text-brand font-bold rounded-full hover:bg-brand-light transition-all shadow-xl inline-block">
                  {t('common.featured.cta')}
               </NavLink>
            </div>
            <div className="relative group">
               <img 
                 src="/assets/studio-1.png" 
                 alt="Project" 
                 className="rounded-3xl shadow-2xl transition-transform group-hover:scale-[1.02] duration-700 h-[400px] w-full object-cover"
               />
               <div className="absolute -bottom-6 -left-6 p-8 bg-white dark:bg-card text-brand dark:text-white rounded-2xl shadow-xl border border-brand/20 max-w-xs">
                  <div className="text-4xl font-black mb-1 text-brand">99%</div>
                  <div className="text-sm font-bold opacity-70">{t('common.featured.satisfaction')}</div>
               </div>
            </div>
         </div>
      </section>



      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-12">
         <div className="bg-gradient-to-r from-brand to-brand-dark rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-accent/5 -z-10" />
            <motion.div 
               whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
               className="relative z-10"
            >
               <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-8">{t('common.cta.title')}</h2>
               <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto">{t('common.cta.subtitle')}</p>
               <NavLink to="/contact" className="px-10 py-5 bg-white text-brand font-black rounded-full hover:bg-brand hover:text-white transition-all inline-flex items-center shadow-xl">
                  {t('common.buttons.getInTouch')} <ArrowRight className="ml-2" />
               </NavLink>
            </motion.div>
         </div>
      </section>
    </div>
  );
};

export default Home;
