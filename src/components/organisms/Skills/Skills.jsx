import SectionHeader from '../../atoms/SectionHeader/SectionHeader';
import SkillCard from '../../molecules/SkillCard/SkillCard';
import { useLanguage } from '../../../hooks/useLanguage';
import profile from '../../../data/profile.json';
import styles from './Skills.module.css';

const Skills = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className={styles.skills}>
      <SectionHeader
        tag={t('skills.tag')}
        title={t('skills.title')}
      />
      <div className={styles.grid}>
        {profile.skills.map((skill) => (
          <SkillCard key={skill.id} {...skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
