import ProjectCard from '../components/ProjectCard';
import researchProjects from '../data/research-projects.json';
import aiProjects from '../data/ai-projects.json';
import platformProjects from '../data/platform-projects.json';
import dataProjects from '../data/data-projects.json';
import styles from '../styles/ProjectsPage.module.css';

const ProjectsPage = ({ sections }) => {
  return (
    <>
      <div className={styles.header}>
        <h3>Projects</h3>
      </div>

      {sections.map((section) => (
        <div key={section.title}>
          <div className={styles.categoryHeader}>
            <h4>{section.title}</h4>
          </div>
          <div className={styles.container}>
            {section.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export async function getStaticProps() {
  const sections = [
    { title: 'Research', projects: researchProjects },
    { title: 'LLMs, RAG & AI Assistants', projects: aiProjects },
    { title: 'AI Platforms & Hackathons', projects: platformProjects },
    { title: 'Data Science & University Projects', projects: dataProjects },
  ];

  return {
    props: { title: 'Projects', sections },
  };
}

export default ProjectsPage;
