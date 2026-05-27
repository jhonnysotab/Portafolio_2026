import SectionHeader from '../../atoms/SectionHeader/SectionHeader';
import Button from '../../atoms/Button/Button';
import cvFile from '../../../assets/cvJhonnysota.pdf';
import TimelineItem from '../../molecules/TimelineItem/TimelineItem';
import { experiencias, experiences, resumeUrlEs, resumeUrlEn } from '../../../data/experience';
import { useLanguage } from '../../../hooks/useLanguage';
import styles from './Experience.module.css';

const Experience = () => {
  const { language, t } = useLanguage();

  // Seleccionar datos según el idioma
  const data = language === 'es' ? experiencias : experiences;
  const resumeUrl = language === 'es' ? resumeUrlEs : resumeUrlEn;

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'cvJhonnySota.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  
  return (
    <section id="experience" className={styles.experience}>
      <SectionHeader 
        tag={t('experience.tag')}
        title={t('experience.title')}
      />
      
      <div className={styles.timeline}>
        {data.map((exp, index) => (
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
          target="_blank"
          rel="noopener noreferrer"
          onClick={downloadCV}
        >
          📄 {t('experience.downloadCv')}
        </Button>
      </div>
    </section>
  );
};

export default Experience;