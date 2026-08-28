import SectionHeader from '../../atoms/SectionHeader/SectionHeader';
import ProjectCard from '../../molecules/ProjectCard/ProjectCard';
import { useLanguage } from '../../../hooks/useLanguage';
import styles from './Projects.module.css';

const Projects = () => {
  const { t } = useLanguage();
  const items = t('projects.items');

  return (
    <section id="projects" className={styles.projects}>
      <SectionHeader
        tag={t('projects.tag')}
        title={t('projects.title')}
      />
      <div className={styles.grid}>
        {items.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            demoLabel={t('projects.demo')}
            githubLabel={t('projects.github')}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
