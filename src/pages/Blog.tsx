import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const Blog: React.FC = () => {
  const { t } = useTranslation();

  const postsData = t('blog.posts', { returnObjects: true }) as Record<string, any>;
  
  const images: Record<string, string> = {
    mic: '/assets/services/music-studio.jpg',
    ai: '/assets/services/video-content.jpg',
    studio: '/assets/services/graphic-design.jpg'
  };

  const posts = Object.keys(postsData).map(key => ({
    ...postsData[key],
    image: images[key] || images.studio
  }));

  return (
    <div className="container mx-auto px-4 py-24 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-5xl lg:text-7xl font-serif font-black tracking-tighter text-gradient leading-tight">
           {t('blog.title')}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
           {t('blog.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
         {posts.map((post, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="group rounded-[2rem] overflow-hidden border border-border bg-card shadow-lg hover:shadow-2xl transition-all"
           >
             <div className="h-64 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 p-3 bg-brand text-accent rounded-full text-xs font-black uppercase tracking-widest">
                   {t('blog.news_tag')}
                </div>
             </div>
             <div className="p-8 space-y-6">
                <div className="flex items-center space-x-6 text-xs font-medium text-muted-foreground">
                   <span className="flex items-center space-x-2"><Calendar size={14} /> <span>{post.date}</span></span>
                   <span className="flex items-center space-x-2"><User size={14} /> <span>{post.author}</span></span>
                </div>
                <h3 className="text-2xl font-serif font-bold group-hover:text-accent transition-colors leading-tight">
                   {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 italic">
                   {t('blog.expertise')}
                </p>
                <button className="flex items-center space-x-2 text-brand dark:text-accent font-black tracking-widest text-xs uppercase hover:underline">
                   <span>{t('blog.read_more')}</span>
                   <ArrowRight size={16} />
                </button>
             </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
};

export default Blog;
