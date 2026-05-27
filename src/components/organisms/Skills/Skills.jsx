import SectionHeader from '../../atoms/SectionHeader/SectionHeader';
import SkillCard from '../../molecules/SkillCard/SkillCard';
import { skills } from '../../../data/skills';
import styles from './Skills.module.css';

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <SectionHeader 
        tag="// 02. habilidades"
        title="Stack tecnológico"
      />
      <div className={styles.grid}>
        {skills.map((skill) => (
          <SkillCard key={skill.id} {...skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;