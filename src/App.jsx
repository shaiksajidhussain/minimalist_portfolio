import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Globe from './components/Globe';
import HireMe from './components/HireMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import BlobCursor from './components/BlobCursor';
import WhoIWorkWith from './components/WhoIWorkWith';
import HowIWork from './components/HowIWork';
import PricingEngagement from './components/PricingEngagement';
import WhyChooseMe from './components/WhyChooseMe';
import Availability from './components/Availability';
import CTAStrip from './components/CTAStrip';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [allProjects] = useState([
    {
      name: 'SaaS Application',
      category: 'SaaS',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'large',
      description: 'A comprehensive SaaS platform with subscription management, user authentication, and payment integration. Built for scalability and performance.',
      client: 'Confidential',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
      name: 'LMS Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'small',
      description: 'A learning management system for educational institutions with course management, student progress tracking, and assessment features.',
      client: 'Educational Institution',
      tech: ['Next.js', 'PostgreSQL', 'Prisma', 'AWS'],
    },
    {
      name: 'School Management System',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'medium',
      description: 'A comprehensive school management solution with student management, fee collection, attendance tracking, and report generation capabilities.',
      client: 'School District',
      tech: ['React', 'Express.js', 'MySQL', 'Razorpay'],
    },
    {
      name: 'Corporate Website',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'small',
      description: 'A modern, responsive corporate website with smooth animations, SEO optimization, and fast loading times.',
      client: 'Corporate Client',
      tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      name: 'E-Commerce Platform',
      category: 'Full-Stack',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'large',
      description: 'A full-featured e-commerce platform with product management, shopping cart, payment processing, and order tracking.',
      client: 'E-Commerce Client',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
      name: 'Dashboard Analytics',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      liveLink: '#',
      githubLink: '#',
      size: 'medium',
      description: 'An analytics dashboard with real-time data visualization, charts, and comprehensive reporting features.',
      client: 'Analytics Company',
      tech: ['React', 'Chart.js', 'Node.js', 'PostgreSQL'],
    },
  ]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = allProjects.findIndex(p => p.name === selectedProject.name);
    const nextIndex = currentIndex < allProjects.length - 1 ? currentIndex + 1 : 0;
    setSelectedProject(allProjects[nextIndex]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousProject = () => {
    if (!selectedProject) return;
    const currentIndex = allProjects.findIndex(p => p.name === selectedProject.name);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : allProjects.length - 1;
    setSelectedProject(allProjects[prevIndex]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedProject) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors relative">
          <BlobCursor
            blobType="circle"
            fillColor="#5227FF"
            trailCount={3}
            sizes={[25, 50, 35]}
            innerSizes={[10, 18, 12]}
            innerColor="rgba(255,255,255,0.8)"
            opacities={[0.6, 0.6, 0.6]}
            shadowColor="rgba(0,0,0,0.75)"
            shadowBlur={4}
            shadowOffsetX={6}
            shadowOffsetY={6}
            filterStdDeviation={20}
            useFilter={true}
            fastDuration={0.1}
            slowDuration={0.5}
            zIndex={100}
          />
          <ProjectDetail
            project={selectedProject}
            allProjects={allProjects}
            onClose={handleCloseProject}
            onNext={handleNextProject}
            onPrevious={handlePreviousProject}
          />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div 
        className="min-h-screen transition-colors relative"
        style={{
          backgroundColor: 'var(--bg-color)',
        }}
      >
        <BlobCursor
          blobType="circle"
          fillColor="#5227FF"
          trailCount={3}
          sizes={[15, 30, 20]}
          innerSizes={[6, 10, 8]}
          innerColor="rgba(255,255,255,0.8)"
          opacities={[0.6, 0.6, 0.6]}
          shadowColor="rgba(0,0,0,0.75)"
          shadowBlur={3}
          shadowOffsetX={5}
          shadowOffsetY={5}
          filterStdDeviation={15}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
          zIndex={100}
        />
        <Navbar />
        <Hero />
        <Skills />
        <Services />
        <WhoIWorkWith />
        <Expertise />
        <Projects onProjectClick={handleProjectClick} projects={allProjects} />
        <About />
        <HowIWork />
        <WhyChooseMe />
        <PricingEngagement />
        <Experience />
        <Availability />
        <CTAStrip />
        <Testimonials />
        <Globe />
      
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
