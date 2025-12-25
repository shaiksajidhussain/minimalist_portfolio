import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Timeline } from './ui/timeline';
import { useTheme } from '../context/ThemeContext';

const Experience = () => {
  const { colors } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences = [
    {
      company: 'QubicGen',
      role: 'MERN STACK Developer → Team Lead',
      duration: 'Jan 2024 - On Going',
      points: [
        'Started as a MERN Stack Developer and progressed to Team Lead, managing a team of 7 junior developers',
        'Conducted comprehensive Knowledge Transfer (KT) sessions and mentored junior team members',
        'Delivered multiple projects including QubicGen Portfolio, QMES, LMS, and Vidynatra',
        'Spearheaded the creation of company website using React.js for frontend and Express.js with MongoDB for backend',
        'Crafted dynamic and engaging platforms with sleek and modern user experiences',
        'Utilized Figma for design and frameworks such as Tailwind CSS and Bootstrap for styling',
        'Integrated various libraries like AOS to enhance website functionality and aesthetics',
        'Worked collaboratively within the team to deliver cutting-edge solutions that embody QubicGen\'s vision and professionalism',
      ],
      technologies: ['JavaScript', 'React', 'Next.js', 'REST API', 'HTML', 'CSS', 'Express.js', 'MongoDB', 'Mongoose', 'Node.js', 'Tailwind CSS', 'Figma'],
      projects: ['QubicGen Portfolio', 'QMES', 'LMS', 'Vidynatra'],
    },
    {
      company: 'Freelance / Consulting',
      role: 'Full-Stack Developer',
      duration: '2023 - Present',
      points: [
        'Built comprehensive portfolio website for AJ Supplements, showcasing their products and brand identity',
        'Developed solutions for Feed Formulate Software, delivering custom software applications',
        'Created portfolio and dashboard for Bhavani Chits chits management system with advanced features',
        'Implemented high-security measures and access controls for financial data management',
        'Optimized websites with SEO best practices to improve search engine visibility and rankings',
        'Developed complete website for Project Genie, including responsive design and modern UI/UX',
        'Managed multiple client projects simultaneously, ensuring timely delivery and quality standards',
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Express.js', 'REST API', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'SEO', 'Security'],
      projects: ['AJ Supplements Portfolio', 'Feed Formulate Software', 'Bhavani Chits Management System', 'Project Genie Website'],
    },
    {
      company: 'Inspire Leap',
      role: 'Full-Stack Developer (Client Project)',
      duration: '2024',
      points: [
        'Created a comprehensive portfolio website with integrated dashboard functionality',
        'Developed and provided access to LMS portal for client\'s educational needs',
        'Managed end-to-end project activities including development, deployment, and maintenance',
        'Implemented robust security measures and access controls for the LMS portal',
        'Ensured seamless user experience across portfolio and dashboard interfaces',
        'Maintained ongoing support and updates for the platform',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'REST API', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    },
    {
      company: 'Melody Mocktails',
      role: 'MERN STACK Developer',
      duration: 'June 2024 – Dec 2024',
      points: [
        'Demonstrated exceptional multitasking abilities by concurrently managing responsibilities across multiple companies',
        'Successfully delivered three significant projects during a 4-month engagement, showcasing versatility and efficiency',
        'Leveraged MERN stack to develop robust, scalable solutions tailored to each client\'s unique requirements',
        'Utilized React.js for creating dynamic front-end interfaces and Express.js with MongoDB for powerful, data-driven back-ends',
        'Applied modern design tools like Figma and CSS frameworks such as Tailwind and Bootstrap to create visually appealing applications',
        'Enhanced project management and client communication abilities, solidifying reputation as adaptable and results-driven developer',
      ],
      technologies: ['Next.js', 'JavaScript', 'React', 'REST API', 'HTML', 'CSS', 'Express.js', 'MongoDB', 'Mongoose', 'Jira', 'BitBucket', 'VS Code'],
    },

    {
      company: 'SRIC',
      role: 'Frontend Developer Intern',
      duration: '2022',
      points: [
        'Designed and developed SRIC\'s public website, implementing a user-friendly interface with HTML, CSS, and JavaScript',
        'Integrated a secure database for collecting and storing user information',
        'Optimized performance and responsiveness across various devices',
        'Utilized ReactJS and Material UI for modern UI components',
      ],
      technologies: ['ReactJS', 'Material UI', 'HTML', 'CSS', 'JavaScript', 'CodeIgniter'],
    },
    {
      company: 'Skilync',
      role: 'Web Designer Intern',
      duration: 'June 2022 – Aug 2022',
      points: [
        'Gained valuable hands-on experience in web designing',
        'Worked with Flutter Flow for rapid prototyping and development',
        'Explored cloud-based solutions for web applications',
      ],
      technologies: ['Flutter Flow', 'Cloud'],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center"
          >
            Work Experience
          </motion.h2>

          <Timeline data={experiences} primaryColor={colors.primary} secondaryColor={colors.secondary} />
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

