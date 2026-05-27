import { forwardRef } from 'react';
import styles from './Button.module.css';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={`${styles.btn} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;