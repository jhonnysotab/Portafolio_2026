import Terminal from '../../molecules/Terminal/Terminal';
import { useLanguage } from '../../../hooks/useLanguage';
import styles from './TerminalSection.module.css';

const TerminalSection = () => {
  const { language } = useLanguage();

  return (
    <section id="terminal-section" className={styles.section}>
      <Terminal key={language} />
    </section>
  );
};

export default TerminalSection;