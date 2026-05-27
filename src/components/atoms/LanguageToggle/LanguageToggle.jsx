import { useLanguage } from '../../../hooks/useLanguage';
import styles from './LanguageToggle.module.css';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className={styles.toggle}
      onClick={toggleLanguage}
      aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className={`${styles.option} ${language === 'es' ? styles.active : ''}`}>
        ES
      </span>
      <div className={styles.divider} />
      <span className={`${styles.option} ${language === 'en' ? styles.active : ''}`}>
        EN
      </span>
      <div className={`${styles.indicator} ${language === 'en' ? styles.indicatorRight : ''}`} />
    </button>
  );
};

export default LanguageToggle;