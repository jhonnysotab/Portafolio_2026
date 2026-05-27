import { useEffect, useRef } from 'react';
import Tag from '../../atoms/Tag/Tag';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './SkillCard.module.css';

const SkillCard = ({ name, percentage, tags }) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.15 });
  const fillRef = useRef(null);

  useEffect(() => {
    if (isIntersecting && fillRef.current) {
      fillRef.current.style.width = `${percentage}%`;
    }
  }, [isIntersecting, percentage]);

  return (
    <div ref={targetRef} className={`${styles.card} reveal`} data-pct={percentage}>
      <div className={styles.top}>
        <span className={styles.name}>{name}</span>
        <span className={styles.percentage}>{percentage}%</span>
      </div>
      <div className={styles.bar}>
        <div ref={fillRef} className={styles.fill} />
      </div>
      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;