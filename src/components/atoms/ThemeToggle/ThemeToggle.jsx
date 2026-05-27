import { useTheme } from '../../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button 
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Cambiar a modo claro ☀️' : 'Cambiar a modo oscuro 🌙'}
    >
      <div className={`${styles.switch} ${isDark ? styles.dark : styles.light}`}>
        {/* Sol - más grande y detallado */}
        {!isDark && (
          <svg className={styles.sunIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
          </svg>
        )}
        
        {/* Luna - más grande y detallada */}
        {isDark && (
          <svg className={styles.moonIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            <circle cx="17" cy="10" r="0.5" fill="currentColor" />
            <circle cx="15" cy="13" r="0.3" fill="currentColor" />
            <circle cx="18" cy="14" r="0.4" fill="currentColor" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;