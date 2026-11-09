import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from "next/image";
import dynamic from 'next/dynamic'
import styles from '../styles/HomePage.module.css';
import experience from '../data/experience.json';
import LinkedinIcon from '../components/icons/LinkedinIcon';

const ParticlesBackground = dynamic(
  () => import('../components/ParticlesBackground'),
  { ssr: false }
)

const education = [
  {
    org: 'Université Paris Cité',
    role: 'MSc ML for Data Science · 2026–2028',
    badge: 'UPC',
    href: 'https://u-paris.fr',
  },
  {
    org: 'Aix-Marseille Université',
    role: 'BSc CS & Big Data · Top of Class',
    badge: 'AMU',
    href: 'https://www.univ-amu.fr',
  },
]

export default function HomePage({ experience }) {
  const [isMounted, setIsMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setIsDesktop(window.innerWidth >= 768)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        {isMounted && isDesktop && <ParticlesBackground />}
        <div className={styles.heroContent}>
          <div className={styles.textSection}>
            <h1 className={styles.name}>Oussama Khaldi</h1>
            <h2 className={styles.title}>AI R&D Engineer · ML Researcher</h2>

            <p className={styles.description}>
              AI R&D Engineer and MSc ML student at Université Paris Cité, building production
              LLM agents, RAG assistants and forecasting models, with research on efficient vision
              architectures.
            </p>

            <div className={styles.expertise}>
              <div className={styles.expertiseTitle}>Specialization</div>
              <div className={styles.expertiseGrid}>
                  <span className={styles.expertiseTag}>Computer Vision</span>
                  <span className={styles.expertiseTag}>VLMs</span>
                  <span className={styles.expertiseTag}>LLMs</span>
                  <span className={styles.expertiseTag}>AI Agents</span>
                  <span className={styles.expertiseTag}>RAG</span>
                  <span className={styles.expertiseTag}>Deep Learning</span>
                  <span className={styles.expertiseTag}>Vision Transformers</span>
                  <span className={styles.expertiseTag}>Time Series Forecasting</span>
                  <span className={styles.expertiseTag}>NLP</span>
                  <span className={styles.expertiseTag}>Optimization</span>
                  <span className={styles.expertiseTag}>PyTorch</span>
                  <span className={styles.expertiseTag}>MLOps</span>
                                </div>
            </div>

            <div className={styles.actions}>
              <Link href="/resume">
                <button className={styles.primaryButton}>
                  <span className={styles.buttonLabel}>Hiring?</span>
                  <span className={styles.buttonMain}>See CV & proof of impact</span>
                </button>
              </Link>
              <a
                href="https://www.linkedin.com/in/khaldi-oussama-9bb66a299/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedinButton}
                aria-label="Connect on LinkedIn"
              >
                <LinkedinIcon width={16} height={16} />
                <span>Connect</span>
              </a>
              <Link href="/contact">
                <button className={styles.secondaryButton}>Contact</button>
              </Link>
            </div>
          </div>

          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              <Image
                className={styles.profileImage}
                src="/oussama.jpg"
                width={280}
                height={280}
                alt="Oussama Khaldi"
              />
            </div>

            <section className={styles.affiliations}>
              <p className={styles.affiliationsLabel}>Education</p>
              <div className={styles.affiliationsGrid}>
                {education.map((item) => (
                  <a
                    key={item.org}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.affiliationCard} ${styles.miccaiCard}`}
                    aria-label={`${item.org} — ${item.role}`}
                  >
                    <div className={styles.affiliationBadge}>{item.badge}</div>
                    <div className={styles.affiliationInfo}>
                      <span className={styles.affiliationOrg}>{item.org}</span>
                      <span className={styles.affiliationRole}>{item.role}</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className={styles.experience}>
        <h2 className={styles.sectionTitle}>Experience</h2>

        <div className={styles.timeline}>
          {experience.map((job) => (
            <div key={job.id} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <Link href="/resume">
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <div>
                      <h3 className={styles.jobTitle}>{job.title}</h3>
                      <p className={styles.company}>{job.company} - {job.location}</p>
                    </div>
                    {job.period && <span className={styles.period}>{job.period}</span>}
                  </div>
                  <p className={styles.jobDescription}>{job.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Home',
      experience
    },
  };
}
