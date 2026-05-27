import styles from './StatBox.module.css';

const StatBox = ({ number, label }) => {
  return (
    <div className={styles.box}>
      <div className={styles.number}>{number}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default StatBox;