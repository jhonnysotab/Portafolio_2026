import { useLanguage } from '../../../hooks/useLanguage';
import ThemeToggle from '../../atoms/ThemeToggle/ThemeToggle';
import LanguageToggle from '../../atoms/LanguageToggle/LanguageToggle';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>&lt;DEV /&gt;</div>
      <ul className={styles.menu}>
        <li><a href="#about" className={styles.link}>{t('nav.about')}</a> | </li>
        <li><a href="#skills" className={styles.link}>{t('nav.skills')}</a> | </li>
        <li><a href="#experience" className={styles.link}>{t('nav.experience')}</a> | </li>
        <li><a href="#projects" className={styles.link}>{t('nav.projects')}</a> | </li>
        <li><a href="#contact" className={styles.link}>{t('nav.contact')}</a> </li>
      </ul>
      <div className={styles.controls}>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;