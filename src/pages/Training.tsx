import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, GraduationCap, X, Send, User, Home, Mail, Phone } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Training: React.FC = () => {
  const { t } = useTranslation();
  const courses = t('training.courses', { returnObjects: true }) as any[];
  
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    address: '',
    email: '',
    phone: '',
    service: ''
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        course_title: selectedCourse.title,
        training_category: selectedCourse.category,
        sub_service: formData.service,
        user_email: formData.email,
        user_phone: formData.phone,
        user_address: formData.address,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // You might need a specific template for training
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setFormStatus('success');
      setTimeout(() => {
        setSelectedCourse(null);
        setFormData({ lastName: '', firstName: '', address: '', email: '', phone: '', service: '' });
      }, 3000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setFormStatus('idle'); // Or show an error
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-20">
      <div className="text-center max-w-3xl mx-auto space-y-8">
        <div className="inline-flex items-center space-x-3 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-black uppercase tracking-widest border border-brand/20">
           <GraduationCap size={18} />
           <span>Academic Excellence</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-serif font-black tracking-tighter text-gradient leading-tight">
          {t('training.title')}
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {t('training.subtitle')}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground">
         <div className="flex items-center space-x-2"><MapPin size={16} className="text-brand" /> <span>{t('training.location')}</span></div>
         <div className="flex items-center space-x-2"><Calendar size={16} className="text-brand" /> <span>{t('training.start_date')}</span></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {courses.map((course, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden bg-white dark:bg-card rounded-[3rem] border border-border shadow-2xl hover:shadow-brand/20 transition-all flex flex-col"
          >
             <div className="h-80 overflow-hidden relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                    <span className="text-accent text-xs font-black uppercase tracking-widest bg-brand px-4 py-1 rounded-full w-fit mb-3">
                       {course.category}
                    </span>
                    <h3 className="text-3xl font-serif font-bold text-white tracking-tight">{course.title}</h3>
                </div>
             </div>
             
             <div className="p-10 flex-grow flex flex-col justify-between space-y-8">
                <p className="text-muted-foreground leading-relaxed">
                   {course.description}
                </p>
                {/* Button removed as requested */}
             </div>
          </motion.div>
        ))}
      </div>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="bg-white dark:bg-card w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative"
             >
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-6 right-6 p-3 hover:bg-muted rounded-full transition-colors"
                >
                   <X size={24} />
                </button>

                <div className="p-8 lg:p-12 space-y-8">
                   {formStatus === 'success' ? (
                     <div className="text-center py-10 space-y-6">
                        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto animate-bounce">
                           <Send size={40} />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-gradient">Inscription Réussie !</h2>
                        <p className="text-muted-foreground">{t('training.form.success')}</p>
                     </div>
                   ) : (
                     <>
                        <div className="space-y-2">
                           <h2 className="text-3xl lg:text-4xl font-serif font-bold leading-tight">
                              {t('training.form.title')} <span className="text-brand italic">{selectedCourse.category}</span>
                           </h2>
                           <p className="text-muted-foreground">{t('training.form.subtitle')}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center space-x-2">
                                 <User size={14} className="text-brand" /> <span>{t('training.form.last_name')}</span>
                              </label>
                              <input 
                                required
                                value={formData.lastName}
                                onChange={e => setFormData({...formData, lastName: e.target.value})}
                                placeholder={t('training.form.placeholders.last_name')}
                                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border-transparent focus:border-brand focus:ring-0 focus:outline-none transition-all"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center space-x-2">
                                 <User size={14} className="text-brand" /> <span>{t('training.form.first_name')}</span>
                              </label>
                              <input 
                                required
                                value={formData.firstName}
                                onChange={e => setFormData({...formData, firstName: e.target.value})}
                                placeholder={t('training.form.placeholders.first_name')}
                                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border-transparent focus:border-brand focus:ring-0 focus:outline-none transition-all"
                              />
                           </div>
                           <div className="md:col-span-2 space-y-2">
                              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center space-x-2">
                                 <Home size={14} className="text-brand" /> <span>{t('training.form.address')}</span>
                              </label>
                              <input 
                                required
                                value={formData.address}
                                onChange={e => setFormData({...formData, address: e.target.value})}
                                placeholder={t('training.form.placeholders.address')}
                                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border-transparent focus:border-brand focus:ring-0 focus:outline-none transition-all"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center space-x-2">
                                 <Mail size={14} className="text-brand" /> <span>{t('training.form.email')}</span>
                              </label>
                              <input 
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                placeholder={t('training.form.placeholders.email')}
                                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border-transparent focus:border-brand focus:ring-0 focus:outline-none transition-all"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center space-x-2">
                                 <Phone size={14} className="text-brand" /> <span>{t('training.form.phone')}</span>
                              </label>
                              <input 
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                placeholder={t('training.form.placeholders.phone')}
                                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border-transparent focus:border-brand focus:ring-0 focus:outline-none transition-all"
                              />
                           </div>
                           <div className="md:col-span-2 space-y-2">
                              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center space-x-2">
                                 <GraduationCap size={14} className="text-brand" /> <span>{t('training.form.service_select')}</span>
                              </label>
                              <select 
                                required
                                value={formData.service}
                                onChange={e => setFormData({...formData, service: e.target.value})}
                                className="w-full px-6 py-4 rounded-2xl bg-muted/30 border-transparent focus:border-brand focus:ring-0 focus:outline-none transition-all appearance-none"
                              >
                                 <option value="">{t('training.form.placeholders.select')}</option>
                                 {(selectedCourse.services || []).map((s: string) => (
                                   <option key={s} value={s}>{s}</option>
                                 ))}
                              </select>
                           </div>

                           <button 
                             type="submit"
                             disabled={formStatus === 'submitting'}
                             className="md:col-span-2 py-5 bg-black text-brand font-black rounded-2xl hover:bg-brand hover:text-white transition-all transform active:scale-95 shadow-xl disabled:opacity-50"
                           >
                              {formStatus === 'submitting' ? (
                                <div className="w-6 h-6 border-4 border-brand border-t-transparent animate-spin rounded-full mx-auto" />
                              ) : t('training.form.submit')}
                           </button>
                        </form>
                     </>
                   )}
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Final */}
      <section className="bg-brand py-24 rounded-[4rem] text-white p-12 lg:p-24 text-center overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <GraduationCap size={400} className="absolute -top-20 -left-20 rotate-12" />
          </div>
          <div className="relative z-10 space-y-10">
             <h2 className="text-4xl lg:text-6xl font-serif font-bold tracking-tight">Envie de transformer votre passion en métier ?</h2>
             <p className="text-xl text-white/80 max-w-2xl mx-auto">Rejoignez Win concept Industry et bénéficiez de l'accompagnement des meilleurs professionnels du secteur.</p>
             <NavLink
               to="/contact"
               className="inline-flex px-12 py-5 bg-white text-brand font-black rounded-full hover:bg-accent hover:text-brand transition-all shadow-2xl scale-110 lg:scale-125"
             >
                Contactez Nous pour en savoir plus
             </NavLink>
          </div>
      </section>
    </div>
  );
};

export default Training;
