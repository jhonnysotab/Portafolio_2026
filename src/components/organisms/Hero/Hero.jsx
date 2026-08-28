import Button from '../../atoms/Button/Button';
import ScrollIndicator from '../../atoms/ScrollIndicator/ScrollIndicator';
import { useTypewriter } from '../../../hooks/useTypewriter';
import { useLanguage } from '../../../hooks/useLanguage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import profile from '../../../data/profile.json';
import styles from './Hero.module.css';

const resumeUrl = `${import.meta.env.BASE_URL}${profile.meta.resume}`;

const Hero = () => {
  const { t } = useLanguage();
  const heroName = t('hero.name');
  const phrases = t('hero.phrases');
  const typewriterText = useTypewriter(phrases, 60, 30, 2000);

  return (
    <section id="hero" className={styles.hero}>
      <div className={`reveal visible ${styles.content}`}>
        <div className={styles.glitch} data-text={heroName}>
          {heroName}
        </div>
        <div className={styles.typewriter}>
          {typewriterText}
          <span className={styles.cursor}>|</span>
        </div>
        <div className={styles.buttons}>
          <Button as="a" href="#projects" variant="primary">
            {t('hero.ctaProjects')}
          </Button>
          <Button as="a" href={resumeUrl} download={profile.meta.resumeDownloadName} variant="outline">
            {t('hero.ctaContact')} <FontAwesomeIcon icon={faFile} />
          </Button>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
};

export default Hero;