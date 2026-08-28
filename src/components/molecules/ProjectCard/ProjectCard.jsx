import { useRef } from 'react';
import Tag from '../../atoms/Tag/Tag';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ number, type, title, description, tags, demo, github, demoLabel = 'Demo', githubLabel = 'GitHub' }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    glowRef.current.style.setProperty('--mx', `${x}%`);
    glowRef.current.style.setProperty('--my', `${y}%`);
  };

  return (
    <div 
      ref={cardRef}
      className={`${styles.card} reveal`}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={styles.glow} />
      <div className={styles.header}>
        <div className={styles.number}>{number}</div>
        <div className={styles.type}>{type}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.stack}>
        {tags.map((tag, index) => (
          <Tag key={index} variant="purple">{tag}</Tag>
        ))}
      </div>
      <div className={styles.footer}>
        <a href={demo} className={styles.link} target="_blank" rel="noreferrer">→ {demoLabel}</a>
        <a href={github} className={styles.link} target="_blank" rel="noreferrer">→ {githubLabel}</a>
      </div>
    </div>
  );
};

export default ProjectCard;