import SectionHeader from '../../atoms/SectionHeader/SectionHeader';
import ProjectCard from '../../molecules/ProjectCard/ProjectCard';
import { proyectos, projects } from '../../../data/projects';
import { useLanguage } from '../../../hooks/useLanguage';
import styles from './Projects.module.css';

const Projects = () => {
  const { language, t } = useLanguage();
  
  // Seleccionar datos según el idioma
  const data = language === 'es' ? proyectos : projects;

  return (
    <section id="projects" className={styles.projects}>
      <SectionHeader 
        tag={t('projects.tag')}
        title={t('projects.title')}
      />
      <div className={styles.grid}>
        {data.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;