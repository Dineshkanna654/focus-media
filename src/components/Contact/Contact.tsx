import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Dribbble } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import styles from './Contact.module.scss';

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo: Array<{
    Icon: LucideIcon;
    title: string;
    value: string;
    link: string | null;
  }> = [
    {
      Icon: Mail,
      title: 'Email',
      value: 'hello@developer.com',
      link: 'mailto:hello@developer.com'
    },
    {
      Icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      Icon: MapPin,
      title: 'Location',
      value: 'San Francisco, CA',
      link: null
    }
  ];

  const socialLinks: Array<{
    name: string;
    url: string;
    Icon: LucideIcon;
  }> = [
    { name: 'GitHub', url: 'https://github.com', Icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com', Icon: Linkedin },
    { name: 'Twitter', url: 'https://twitter.com', Icon: Twitter },
    { name: 'Dribbble', url: 'https://dribbble.com', Icon: Dribbble }
  ];

  return (
    <section id="contact" className={styles.contact} ref={ref}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.heading}
        >
          <h2>Get In Touch</h2>
          <p className={styles.subheading}>Let's discuss your next project</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.info}
          >
            <h3>Let's work together</h3>
            <p>
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className={styles.contactCards}>
              {contactInfo.map((info, index) => {
                const { Icon } = info;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className={styles.contactCard}
                  >
                    <div className={styles.cardIcon}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4>{info.title}</h4>
                      {info.link ? (
                        <a href={info.link}>{info.value}</a>
                      ) : (
                        <p>{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className={styles.social}>
              <h4>Follow Me</h4>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => {
                  const { Icon } = social;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className={styles.socialLink}
                      title={social.name}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.submitBtn}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
