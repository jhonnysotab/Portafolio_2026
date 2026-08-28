import SectionHeader from '../../atoms/SectionHeader/SectionHeader';
import Button from '../../atoms/Button/Button';
import TimelineItem from '../../molecules/TimelineItem/TimelineItem';
import { useLanguage } from '../../../hooks/useLanguage';
import profile from '../../../data/profile.json';
import styles from './Experience.module.css';

const resumeUrl = `${import.meta.env.BASE_URL}${profile.meta.resume}`;

const Experience = () => {
  const { t } = useLanguage();
  const items = t('experience.items');

  return (
    <section id="experience" className={styles.experience}>
      <SectionHeader
        tag={t('experience.tag')}
        title={t('experience.title')}
      />

      <div className={styles.timeline}>
        {items.map((exp, index) => (
          <TimelineItem
            key={exp.id}
            experience={exp}
            isEven={index % 2 === 0}
          />
        ))}
      </div>

      <div className={styles.resumeButton}>
        <Button
          as="a"
          href={resumeUrl}
          variant="outline"
          className={styles.downloadCv}
          download={profile.meta.resumeDownloadName}
        >
          📄 {t('experience.downloadCv')}
        </Button>
      </div>
    </section>
  );
};

export default Experience;
