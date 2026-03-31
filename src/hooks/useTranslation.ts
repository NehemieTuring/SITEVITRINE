import { useTranslation as useTranslationContext } from '../contexts/LanguageContext';

export const useTranslation = () => {
  return useTranslationContext();
};
