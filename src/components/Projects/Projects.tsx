import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, type MouseEvent } from 'react';
import styles from './Projects.module.scss';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with real-time inventory management and payment processing.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates and team collaboration features.',
    tags: ['TypeScript', 'React', 'Firebase', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    title: 'AI Chat Application',
    description: 'Intelligent chatbot powered by AI with natural language processing capabilities.',
    tags: ['Python', 'FastAPI', 'OpenAI', 'React'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop'
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description: 'Real-time analytics platform with interactive charts and data visualization.',
    tags: ['React', 'D3.js', 'PostgreSQL', 'Express'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
  },
  {
    id: 5,
    title: 'Social Media Platform',
    description: 'Feature-rich social networking platform with posts, stories, and messaging.',
    tags: ['Next.js', 'GraphQL', 'AWS', 'Redis'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop'
  },
  {
    id: 6,
    title: 'Fitness Tracking App',
    description: 'Mobile-first fitness application with workout plans and progress tracking.',
    tags: ['React Native', 'TypeScript', 'Firebase', 'Charts'],
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop'
  }
];

const Card3D = ({ project }: { project: typeof projects[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.05, z: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.cardInner}>
        <div className={styles.imageWrapper}>
          <img src={project.image} alt={project.title} />
          <div className={styles.overlay}>
            <button className={styles.viewBtn}>View Project</button>
          </div>
        </div>
        <div className={styles.cardContent}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.cardGlow} />
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="projects" className={styles.projects} ref={ref}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.heading}
        >
          <h2>Featured Projects</h2>
          <p className={styles.subheading}>Recent work that showcases my expertise</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={styles.grid}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <Card3D project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
