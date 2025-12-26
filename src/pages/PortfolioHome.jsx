import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { SmoothCursor } from '../components/ui/smooth-cursor';
import { ScrollProgress } from '../components/ui/scroll-progress';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Expertise from '../components/Expertise';
import Projects from '../components/Projects';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Testimonials from '../components/Testimonials';
import Globe from '../components/Globe';
import HireMe from '../components/HireMe';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ProjectDetail from '../components/ProjectDetail';
import BlobCursor from '../components/BlobCursor';
import WhoIWorkWith from '../components/WhoIWorkWith';
import HowIWork from '../components/HowIWork';
import PricingEngagement from '../components/PricingEngagement';
import WhyChooseMe from '../components/WhyChooseMe';
import Availability from '../components/Availability';
import CTAStrip from '../components/CTAStrip';
import config from '../config/api';

const PortfolioHome = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [allProjects, setAllProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/projects`);
        const data = await response.json();
        setAllProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setAllProjects([]);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    setScrollPosition(window.scrollY);
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    // Restore scroll position immediately after render
    setTimeout(() => {
      window.scrollTo({ top: scrollPosition, behavior: 'auto' });
      // Then smooth scroll to show the transition
      setTimeout(() => {
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      }, 10);
    }, 0);
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
        <SmoothCursor />
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
        <ScrollProgress />
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
        {/* <PricingEngagement /> */}
        <Experience />
        <Availability />
        <CTAStrip />
        <Testimonials  />
        <Globe />
      
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default PortfolioHome;
