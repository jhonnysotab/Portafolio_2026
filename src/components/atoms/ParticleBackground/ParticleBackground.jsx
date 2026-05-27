import { useRef } from 'react';
import { useParticleBackground } from '../../../hooks/useParticleBackground';
import styles from './ParticleBackground.module.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  useParticleBackground(canvasRef);

  return (
    <canvas 
      ref={canvasRef} 
      className={styles.canvas}
      id="bg"
    />
  );
};

export default ParticleBackground;