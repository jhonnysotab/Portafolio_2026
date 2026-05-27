import styles from './Footer.module.css';
import { useLanguage } from '../../../hooks/useLanguage';

const Footer = () => {
  
    const { t } = useLanguage();
    
  return (
    <footer className={styles.footer}>
      <p>{t('footer.text')}</p>
    </footer>
  );
};

export default Footer;