import Tag from '../../atoms/Tag/Tag';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './TimelineItem.module.css';

const TimelineItem = ({ experience, isEven }) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div 
      ref={targetRef}
      className={`${styles.timelineItem} ${isEven ? styles.even : styles.odd} ${isIntersecting ? styles.visible : ''}`}
    >
      {/* Línea de tiempo y punto */}
      <div className={styles.timelineConnector}>
        <div className={styles.dot} />
        <div className={styles.line} />
      </div>

      {/* Contenido */}
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.period}>
            <span className={styles.calendar}>📅</span>
            <span>{experience.period}</span>
            <span className={styles.type}>{experience.type}</span>
          </div>
          <div className={styles.location}>
            <span>📍 {experience.location}</span>
          </div>
        </div>

        <h3 className={styles.role}>{experience.role}</h3>
        <h4 className={styles.company}>{experience.company}</h4>
        
        <p className={styles.description}>{experience.description}</p>

        <ul className={styles.achievements}>
          {experience.achievements.map((achievement, index) => (
            <li key={index} className={styles.achievementItem}>
              <span className={styles.checkmark}>✓</span>
              {achievement}
            </li>
          ))}
        </ul>

        <div className={styles.technologies}>
          {experience.technologies.map((tech, index) => (
            <Tag key={index} variant="tech">{tech}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;