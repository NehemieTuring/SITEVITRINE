import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, X } from 'lucide-react';
import UniversalPlayer from '../components/media/UniversalPlayer';

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const projectsData = t('portfolio.projects', { returnObjects: true }) as any[];
  
  // Mapping categories as in the UI
  const categories = ['music', 'video', 'graphics', 'music', 'event', 'video'];
  const images = [
    '/assets/services/music-studio.jpg',
    '/assets/services/video-content.jpg',
    '/assets/services/graphic-design.jpg',
    '/assets/services/voice-recording.jpg',
    '/assets/services/event-coverage.jpg',
    '/assets/services/realization.jpg'
  ];

  const projects = Array.isArray(projectsData) ? projectsData.map((p, i) => ({
    ...p,
    id: i + 1,
    category: categories[i],
    image: images[i]
  })) : [];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const filterOptions = [
    { id: 'all', label: t('portfolio.filters.all') },
    { id: 'music', label: t('portfolio.filters.music') },
    { id: 'video', label: t('portfolio.filters.video') },
    { id: 'graphics', label: t('portfolio.filters.graphics') },
    { id: 'event', label: t('portfolio.filters.event') },
  ];

  return (
    <div className="container mx-auto px-4 py-24 min-h-[80vh]">
      <div className="text-center mb-16 max-w-2xl mx-auto space-y-6">
        <h1 className="text-5xl lg:text-7xl font-serif font-black tracking-tighter text-gradient">{t('portfolio.title')}</h1>
        <p className="text-muted-foreground">{t('portfolio.subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {filterOptions.map((opt) => (
          <button 
            key={opt.id}
            onClick={() => setFilter(opt.id)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
               filter === opt.id 
                 ? 'bg-accent text-brand shadow-lg' 
                 : 'bg-muted hover:bg-muted-foreground/10 text-foreground'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => (
            <motion.div 
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10 }}
              className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer"
              onClick={() => setSelectedMedia(p)}
            >
               <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/20 to-transparent p-8 flex flex-col justify-end">
                  <span className="text-accent text-xs font-black uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                     {t(`portfolio.filters.${p.category}`)}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-accent transition-colors">
                     {p.title}
                  </h3>
                  <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <button className="p-3 bg-white text-brand rounded-full hover:bg-accent hover:text-white transition-all">
                        {p.category === 'music' || p.category === 'video' ? <Play size={20} fill="currentColor" /> : <Eye size={20} />}
                     </button>
                     <span className="text-white/60 text-sm font-medium">{p.client} — {p.year}</span>
                  </div>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Media Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand/95 backdrop-blur-xl p-4 lg:p-24 flex items-center justify-center"
          >
             <button 
               onClick={() => setSelectedMedia(null)}
               className="absolute top-8 right-8 p-4 bg-white/10 text-white rounded-full hover:bg-white transition-all hover:text-brand z-10"
             >
                <X size={24} />
             </button>
             
             <div className="w-full max-w-5xl">
                <UniversalPlayer 
                  src={selectedMedia.category === 'video' ? 'https://videos.pexels.com/video-files/3130182/3130182-uhd_2560_1440_30fps.mp4' : ''}
                  type={selectedMedia.category === 'music' ? 'audio' : 'video'}
                  title={selectedMedia.title}
                  subtitle={`${selectedMedia.client} | ${selectedMedia.year}`}
                  poster={selectedMedia.image}
                  onClose={() => setSelectedMedia(null)}
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
