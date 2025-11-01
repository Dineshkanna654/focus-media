import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.scss';

const skills = [
  { name: 'React', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 85 },
  { name: 'MongoDB', level: 82 },
  { name: 'AWS', level: 80 },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.heading}
        >
          <h2>About Me</h2>
          <p className={styles.subheading}>Building digital solutions that make a difference</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.intro}
          >
            <p>
              I'm a passionate software developer specializing in building exceptional
              web applications and digital experiences. With expertise in modern
              technologies and a keen eye for design, I help businesses bring their
              ideas to life.
            </p>
            <p>
              My approach combines technical excellence with creative problem-solving,
              ensuring every project not only meets requirements but exceeds expectations.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className={styles.stat}>
                <h3>30+</h3>
                <p>Happy Clients</p>
              </div>
              <div className={styles.stat}>
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={styles.skills}
          >
            <h3>Technical Skills</h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className={styles.skillItem}
              >
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillLevel}>{skill.level}%</span>
                </div>
                <div className={styles.skillBar}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={styles.skillProgress}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
