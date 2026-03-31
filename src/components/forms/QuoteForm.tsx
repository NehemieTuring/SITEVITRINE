import React, { useState } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { Send, CheckCircle2, ChevronDown } from 'lucide-react';

interface QuoteFormProps {
  services: string[];
  onSuccess?: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ services, onSuccess }) => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !email) return;

    setStatus('loading');
    
    // Simulate sending
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 size={40} />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">{t('contact.success_title') || 'Demande envoyée !'}</h3>
          <p className="text-muted-foreground">{t('contact.success_message') || 'Nous vous recontacterons très prochainement.'}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
          {t('services.labels.request_quote') || 'Service souhaité'}
        </label>
        <div className="relative group">
          <select
            required
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full p-5 bg-muted/30 border border-border rounded-3xl focus:ring-2 focus:ring-brand focus:border-brand transition-all outline-none appearance-none cursor-pointer pr-12"
          >
            <option value="" disabled>{t('services.labels.select_service') || 'Choisir un service...'}</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-focus-within:text-brand group-focus-within:rotate-180 transition-all" size={20} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
          {t('services.labels.email_placeholder') || 'E-mail'}
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          className="w-full p-5 bg-muted/30 border border-border rounded-3xl focus:ring-2 focus:ring-brand focus:border-brand transition-all outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground ml-1">
          {t('services.labels.message_placeholder') || 'Détails du projet'}
        </label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('services.labels.message_placeholder')}
          className="w-full p-5 bg-muted/30 border border-border rounded-3xl focus:ring-2 focus:ring-brand focus:border-brand transition-all outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-5 bg-brand text-white font-black rounded-full hover:bg-brand-dark transition-all shadow-xl hover:shadow-brand/20 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed group"
      >
        <span>{status === 'loading' ? '...' : (t('services.labels.submit_request') || 'Envoyer')}</span>
        {status !== 'loading' && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
      </button>
    </form>
  );
};

export default QuoteForm;
