import React, { useReducer, useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Instagram, Twitter, Linkedin, Facebook, X } from 'lucide-react';
import { clsx } from 'clsx';
import emailjs from '@emailjs/browser';

type FormState = {
  name: string;
  email: string;
  service: string;
  message: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
};

type FormAction = 
  | { type: 'SET_FIELD', field: string, value: string }
  | { type: 'SET_STATUS', status: FormState['status'] };

const initialState: FormState = {
  name: '',
  email: '',
  service: '',
  message: '',
  status: 'idle',
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    default:
      return state;
  }
}

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!state.name) newErrors.name = t('contact.form.validation.required');
    if (!state.email) newErrors.email = t('contact.form.validation.required');
    else if (!/^\S+@\S+\.\S+$/.test(state.email)) newErrors.email = t('contact.form.validation.invalid_email');
    if (!state.message) newErrors.message = t('contact.form.validation.required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    dispatch({ type: 'SET_STATUS', status: 'submitting' });
    
    try {
      const templateParams = {
        user_name: state.name,
        user_email: state.email,
        service: state.service,
        message: state.message,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      dispatch({ type: 'SET_STATUS', status: 'success' });
    } catch (error) {
      console.error('EmailJS error:', error);
      dispatch({ type: 'SET_STATUS', status: 'error' });
    }
  };

  const services = [
    t('services.categories.music'),
    t('services.categories.video'),
    t('services.categories.management'),
    t('services.categories.training'),
    t('contact.form.other')
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        {/* Contact Info */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
             <h1 className="text-5xl lg:text-7xl font-serif font-black tracking-tighter text-gradient leading-tight">
                {t('contact.title')}
             </h1>
             <p className="text-xl text-muted-foreground leading-relaxed">
                {t('contact.subtitle')}
             </p>
          </motion.div>

          <div className="space-y-8">
             {[
               { icon: <MapPin size={28} />, title: t('contact.info.visit'), text: t('contact.info.address') },
               { icon: <Phone size={28} />, title: t('contact.info.call'), text: t('contact.info.phone') },
               { icon: <Mail size={28} />, title: t('contact.info.email'), text: t('contact.info.email_addr') },
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="flex items-start space-x-6 p-6 rounded-3xl bg-muted/20 border border-white/10"
               >
                  <div className="w-14 h-14 rounded-2xl bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/20">
                     {item.icon}
                  </div>
                  <div>
                     <h3 className="font-bold text-lg">{item.title}</h3>
                     <p className="text-muted-foreground">{item.text}</p>
                  </div>
               </motion.div>
             ))}
          </div>

          <div className="flex space-x-4">
             {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
               <button key={i} className="p-4 bg-muted/30 rounded-full hover:bg-accent hover:text-brand transition-all">
                  <Icon size={20} />
               </button>
             ))}
          </div>
        </div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 lg:p-12 bg-white dark:bg-card rounded-[3rem] shadow-2xl border border-border"
        >
          {state.status === 'success' ? (
            <div className="text-center py-20 space-y-6">
               <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Send size={40} />
               </div>
               <h2 className="text-3xl font-serif font-bold">{t('contact.form.success')}</h2>
               <button 
                 onClick={() => dispatch({ type: 'SET_STATUS', status: 'idle' })}
                 className="px-8 py-3 bg-brand text-white rounded-full hover:bg-accent hover:text-brand transition-all"
               >
                 {t('contact.form.send_another')}
               </button>
            </div>
          ) : state.status === 'error' ? (
            <div className="text-center py-20 space-y-6">
               <div className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <X size={40} />
               </div>
               <h2 className="text-3xl font-serif font-bold">{t('contact.form.error')}</h2>
               <p className="text-muted-foreground">{t('contact.form.error_desc')}</p>
               <button 
                 onClick={() => dispatch({ type: 'SET_STATUS', status: 'idle' })}
                 className="px-8 py-3 bg-brand text-white rounded-full hover:bg-accent hover:text-brand transition-all"
               >
                 {t('contact.form.try_again')}
               </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
               <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('contact.form.name')}</label>
                  <input 
                    type="text" 
                    value={state.name}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
                    className={clsx(
                      "w-full bg-muted/30 border border-transparent rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all",
                      errors.name && "border-red-500"
                    )}
                    placeholder={t('contact.form.placeholders.name')}
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('contact.form.email')}</label>
                  <input 
                    type="email" 
                    value={state.email}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
                    className={clsx(
                      "w-full bg-muted/30 border border-transparent rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all",
                      errors.email && "border-red-500"
                    )}
                    placeholder={t('contact.form.placeholders.email')}
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('contact.form.service')}</label>
                  <div className="relative">
                    <select 
                      value={state.service}
                      onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'service', value: e.target.value })}
                      className="w-full bg-muted/30 border border-transparent rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"
                    >
                       <option value="">{t('contact.form.placeholders.service')}</option>
                       {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t('contact.form.message')}</label>
                  <textarea 
                    rows={5}
                    value={state.message}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'message', value: e.target.value })}
                    className={clsx(
                      "w-full bg-muted/30 border border-transparent rounded-2xl px-6 py-6 focus:outline-none focus:border-brand transition-all resize-none",
                      errors.message && "border-red-500"
                    )}
                    placeholder={t('contact.form.placeholders.message')}
                  />
                  {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
               </div>

               <button 
                 type="submit" 
                 disabled={state.status === 'submitting'}
                 className="w-full py-5 bg-accent text-brand font-black rounded-2xl hover:bg-brand hover:text-white transition-all transform active:scale-95 flex items-center justify-center space-x-3 shadow-xl hover:shadow-accent/20"
               >
                  {state.status === 'submitting' ? (
                     <div className="w-6 h-6 border-4 border-brand border-t-transparent animate-spin rounded-full" />
                  ) : (
                    <>
                      <span>{t('contact.form.submit')}</span>
                      <Send size={20} />
                    </>
                  )}
               </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
