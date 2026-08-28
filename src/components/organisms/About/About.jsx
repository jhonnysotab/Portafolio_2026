import SectionHeader from '../../atoms/SectionHeader/SectionHeader';
import StatBox from '../../molecules/StatBox/StatBox';
import styles from './About.module.css';
import { useLanguage } from '../../../hooks/useLanguage';
import profile from '../../../data/profile.json';

const avatarSrc = `${import.meta.env.BASE_URL}${profile.meta.avatar}`;

const About = () => {
  const { t } = useLanguage();
  const stats = t('about.stats');

  return (
    <section id="about" className={styles.about}>
      <SectionHeader
        tag={t('about.tag')}
        title={t('about.title')}
      />
      <div className={styles.grid}>
        <div className={`reveal ${styles.avatarSection}`}>
          <div className={styles.avatar}>
            <div className={styles.ring} />
            <div className={styles.ring2} />
            <div className={styles.avatarImg}>
              <img src={avatarSrc} alt={profile.meta.name} width="280" height="280" loading="lazy" decoding="async" />
            </div>
          </div>
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <StatBox key={index} number={stat.number} label={stat.label} />
            ))}
          </div>
        </div>
        <div className={`reveal ${styles.text}`}>
          <p dangerouslySetInnerHTML={{ __html: t('about.description1') }} />
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
