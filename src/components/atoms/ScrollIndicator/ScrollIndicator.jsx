import styles from './ScrollIndicator.module.css';

const ScrollIndicator = () => {
  return (
    <div className={styles.indicator}>
      <span className={styles.text}>Scroll</span>
      <div className={styles.line} />
    </div>
  );
};

export default ScrollIndicator;