import styles from './Tag.module.css';

const Tag = ({ children, variant = 'default', className = '' }) => {
  return (
    <span className={`${styles.tag} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Tag;