import Terminal from '../../molecules/Terminal/Terminal';
import styles from './TerminalSection.module.css';

const TerminalSection = () => {
  return (
    <section id="terminal-section" className={styles.section}>
      <Terminal />
    </section>
  );
};

export default TerminalSection;