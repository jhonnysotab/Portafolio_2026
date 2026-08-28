import { useRef } from 'react';
import { usePs1Background } from '../../../hooks/usePs1Background';
import styles from './Ps1Background.module.css';

const Ps1Background = () => {
  const canvasRef = useRef(null);
  usePs1Background(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      id="bg"
    />
  );
};

export default Ps1Background;
