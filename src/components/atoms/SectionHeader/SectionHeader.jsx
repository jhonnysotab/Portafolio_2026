import styles from './SectionHeader.module.css';

const SectionHeader = ({ tag, title, className = '' }) => {
  return (
    <div className={`${styles.header} reveal ${className}`}>
      <div className={styles.tag}>{tag}</div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.line} />
    </div>
  );
};

export default SectionHeader;