import { forwardRef } from 'react';
import styles from './Button.module.css';

const Button = forwardRef(({
  as: Component = 'button',
  children,
  variant = 'primary',
  className = '',
  ...props
}, ref) => {
  return (
    <Component
      ref={ref}
      className={`${styles.btn} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;