import { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { useLanguage } from '../../../hooks/useLanguage';
import styles from './Terminal.module.css';

const Terminal = () => {
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });
  const { t } = useLanguage();
  const [displayedLines, setDisplayedLines] = useState([]);
  const [showCursor, setShowCursor] = useState(false);
  const hasAnimated = useRef(false);

  const terminalLines = t('terminal.lines');
  const promptPath = t('terminal.promptPath');

  useEffect(() => {
    if (!isIntersecting || hasAnimated.current) return;
    hasAnimated.current = true;

    let delay = 0;
    terminalLines.forEach((line, index) => {
      setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);

        if (index === terminalLines.length - 1) {
          setTimeout(() => setShowCursor(true), 300);
        }
      }, delay);

      // Velocidad variable según tipo
      if (line.type === 'cmd') {
        delay += 600; // Comandos más lentos
      } else if (line.highlight) {
        delay += 300; // Destacados un poco más lentos
      } else {
        delay += 150; // Salida normal rápida
      }
    });
  }, [isIntersecting, terminalLines]);

  return (
    <div ref={targetRef} className={`${styles.terminal} reveal`}>
      <div className={styles.header}>
        <div className={styles.dot} style={{ background: '#ff5f56' }} />
        <div className={styles.dot} style={{ background: '#ffbd2e' }} />
        <div className={styles.dot} style={{ background: '#27c93f' }} />
        <span className={styles.title}>{promptPath}</span>
        <span className={styles.headerInfo}>— bash — 80x24</span>
      </div>
      <div className={styles.body}>
        {displayedLines.map((line, index) => (
          <div
            key={index}
            className={`${styles.line} ${line.highlight ? styles.highlight : ''} ${styles.fadeIn}`}
          >
            {line.type === 'cmd' ? (
              <>
                <span className={styles.prompt}>$ </span>
                <span className={styles.cmd}>{line.text}</span>
              </>
            ) : (
              <span className={`${styles.output} ${line.highlight ? styles.highlight : ''}`}>
                {line.text}
              </span>
            )}
          </div>
        ))}
        {showCursor && (
          <div className={styles.line}>
            <span className={styles.prompt}>$ </span>
            <span className={styles.cursorBlink} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
