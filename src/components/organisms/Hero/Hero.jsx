import Button from '../../atoms/Button/Button';
import cvFile from '../../../assets/cvJhonnysota.pdf';
import ScrollIndicator from '../../atoms/ScrollIndicator/ScrollIndicator';
import { useTypewriter } from '../../../hooks/useTypewriter';
import { useLanguage } from '../../../hooks/useLanguage';
import styles from './Hero.module.css';

const phrasesEs = [
  'Full Stack Java',
  'Arquitecto Spring Boot',
  'Microservicios ',
  '6 años de experiencia',
  'Codigo Limpio'
];

const phrasesEn = [
  'Full Stack Java Developer',
  'Spring Boot Architect',
  'Microservices Engineer',
  '6 years of experience',
  'Clean Code Advocate'
];

const Hero = () => {
  const { language, t } = useLanguage();
  const phrases = language === 'es' ? phrasesEs : phrasesEn;
  const typewriterText = useTypewriter(phrases, 60, 30, 2000);

const downloadCV = () => {
  const link = document.createElement('a');
  link.href = cvFile;
  link.download = 'cvJhonnySota.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
};

  return (
    <section id="hero" className={styles.hero}>
      <div className="reveal visible">
        <div className={styles.glitch} data-text="Jhonny Developer">
          Jhonny Developer
        </div>
        <div className={styles.typewriter}>
          {typewriterText}
          <span className={styles.cursor}>|</span>
        </div>
        <div className={styles.buttons}>
          <Button as="a" href="/#projects" variant="primary">
           {t('hero.ctaProjects')}
          </Button>
          <Button as="a"   variant="outline" onClick={downloadCV}>
            {t('hero.ctaContact')} <i class="fa-solid fa-file"></i>
          </Button>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
};

export default Hero;