import SectionHeader from '../../atoms/SectionHeader/SectionHeader';
import StatBox from '../../molecules/StatBox/StatBox';
import styles from './About.module.css';
import { useLanguage } from '../../../hooks/useLanguage';

const stats = [
  { number: '6+', label: 'Años exp.' },
  { number: '15+', label: 'Proyectos' },
  { number: '12+', label: 'Clientes' },
  { number: '99%', label: 'Uptime' }
];

const About = () => {
    const { t } = useLanguage();
  
    return (
    <section id="about" className={styles.about}>
      <SectionHeader 
        tag="// 01. sobre mí"
        title="Full Stack Developer"
      />
      <div className={styles.grid}>
        <div className={`reveal ${styles.avatarSection}`}>
          <div className={styles.avatar}>
            <div className={styles.ring} />
            <div className={styles.ring2} />
            <div className={styles.avatarImg}><img src="src\assets\jhonnyStudiosGibly.png"/></div>
          </div>
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <StatBox key={index} number={stat.number} label={stat.label} />
            ))}
          </div>
        </div>
        <div className={`reveal ${styles.text}`}>
          <p dangerouslySetInnerHTML={{ __html:t('about.description1')}} />
          <p>
             {t('about.description2')}
          </p>
          <p>
             {t('about.description3')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;