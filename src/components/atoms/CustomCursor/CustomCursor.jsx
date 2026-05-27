import { useCustomCursor } from '../../../hooks/useCustomCursor';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const { cursorRef, ringRef } = useCustomCursor();

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
};

export default CustomCursor;