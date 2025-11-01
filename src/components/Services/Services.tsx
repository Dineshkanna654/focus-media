import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, MouseEvent } from 'react';
import { Code2, Smartphone, Palette, Server, Rocket, Wrench } from 'lucide-react';
import styles from './Services.module.scss';

const services = [
  {
    id: 1,
    Icon: Code2,
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks and best practices for optimal performance.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Secure']
  },
  {
    id: 2,
    Icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps that deliver native-like experience on iOS and Android.',
    features: ['React Native', 'Cross-platform', 'Native Feel', 'App Store Ready']
  },
  {
    id: 3,
    Icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces that enhance user experience and engagement.',
    features: ['Modern Design', 'User Research', 'Prototyping', 'Brand Identity']
  },
  {
    id: 4,
    Icon: Server,
    title: 'Backend Development',
    description: 'Scalable and secure backend systems with RESTful APIs and database management.',
    features: ['API Development', 'Database Design', 'Cloud Services', 'Security']
  },
  {
    id: 5,
    Icon: Rocket,
    title: 'DevOps & Deployment',
    description: 'CI/CD pipelines and cloud infrastructure setup for seamless deployment and scaling.',
    features: ['AWS/Azure', 'Docker', 'CI/CD', 'Monitoring']
  },
  {
    id: 6,
    Icon: Wrench,
    title: 'Consulting & Support',
    description: 'Technical consulting and ongoing support to ensure your project success.',
    features: ['Code Review', 'Architecture', 'Performance', '24/7 Support']
  }
];

const ServiceCard3D = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

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

  const { Icon } = service;

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
        background: index % 2 === 0
          ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
          : 'rgba(255, 255, 255, 0.03)'
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.cardInner}>
        <motion.div
          className={styles.icon}
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon size={48} />
        </motion.div>

        <h3>{service.title}</h3>
        <p className={styles.description}>{service.description}</p>

        <ul className={styles.features}>
          {service.features.map((feature) => (
            <li key={feature}>
              <span className={styles.checkmark}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.cardGlow} />
    </motion.div>
  );
};

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="services" className={styles.services} ref={ref}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.heading}
        >
          <h2>Services I Offer</h2>
          <p className={styles.subheading}>Comprehensive solutions for your digital needs</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={styles.grid}
        >
          {services.map((service, index) => (
            <motion.div key={service.id} variants={cardVariants}>
              <ServiceCard3D service={service} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
