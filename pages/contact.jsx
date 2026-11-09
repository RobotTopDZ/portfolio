import styles from '../styles/ContactPage.module.css';
import MailIcon from '../components/icons/MailIcon';
import LinkedinIcon from '../components/icons/LinkedinIcon';
import GithubIcon from '../components/icons/GithubIcon';
import ScholarIcon from '../components/icons/ScholarIcon';
import OrcidIcon from '../components/icons/OrcidIcon';
import ResearchGateIcon from '../components/icons/ResearchGateIcon';

const ContactPage = () => {
  const contactMethods = [
    {
      name: 'Email',
      value: 'oussama.khaldi@etu.u-paris.fr',
      href: 'mailto:oussama.khaldi@etu.u-paris.fr',
      icon: <MailIcon width={44} height={44} />,
      description: 'Best way to reach me'
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/khaldi-oussama',
      href: 'https://www.linkedin.com/in/khaldi-oussama-9bb66a299/',
      icon: <LinkedinIcon width={44} height={44} />,
      description: 'Professional profile'
    },
    {
      name: 'GitHub',
      value: 'github.com/RobotTopDZ',
      href: 'https://github.com/RobotTopDZ',
      icon: <GithubIcon width={44} height={44} />,
      description: 'Code & open source'
    },
    {
      name: 'Google Scholar',
      value: 'scholar.google.com',
      href: 'https://scholar.google.com/citations?user=KuIUcOgAAAAJ&hl=fr',
      icon: <ScholarIcon width={44} height={44} />,
      description: 'Publications'
    },
    {
      name: 'ORCID',
      value: '0009-0006-8184-3959',
      href: 'https://orcid.org/0009-0006-8184-3959',
      icon: <OrcidIcon width={44} height={44} />,
      description: 'Research identity'
    },
    {
      name: 'ResearchGate',
      value: 'researchgate.net',
      href: 'https://www.researchgate.net/profile/Oussama-Khaldi-3',
      icon: <ResearchGateIcon width={44} height={44} />,
      description: 'Papers & collaborations'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Get In Touch</h1>
          <p className={styles.subtitle}> AI R&D Engineer • LLMs & AI Agents • MSc ML for Data Science @ Université Paris Cité </p>
        </div>

        <div className={styles.bio}>
          <p>
            AI R&D Engineer at Atidgo (Marseille), where I lead the development of DUFI, an AI-powered WhatsApp ordering assistant built on multilingual LLM orchestration and voice processing, and design demand-forecasting models that improved accuracy by 20% over baselines.
          </p>
          <p>
            Previously founded DZDigitalServices, delivering LLM-powered automation for 80+ clients. MSc student in Machine Learning for Data Science at Université Paris Cité, co-author of research on efficient vision architectures (Gated Linear Attention + KAN), and winner of multiple AI hackathons including the AIM Agentic AI Hackathon (France). Fluent in French (C2) and English (C1).
          </p>
        </div>

        <div className={styles.contactGrid}>
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
            >
              <div className={styles.cardIcon}>{method.icon}</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{method.name}</h3>
                <p className={styles.cardValue}>{method.value}</p>
                <p className={styles.cardDescription}>{method.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.availability}>
            <span className={styles.statusIndicator}></span>
            Open to AI/ML engineering roles, research collaborations, and freelance projects
          </p>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Contact' },
  };
}

export default ContactPage;
