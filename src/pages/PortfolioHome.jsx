import React, { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import Navbar from '../components/Navbar';
import HeroStack from '../components/HeroStack';
import Services from '../components/Services';
import Expertise from '../components/Expertise';
import Projects from '../components/Projects';
import About from '../components/About';
import Experience from '../components/Experience';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ProjectDetail from '../components/ProjectDetail';
import WhoIWorkWith from '../components/WhoIWorkWith';
import HowIWork from '../components/HowIWork';
import WhyChooseMe from '../components/WhyChooseMe';
import Availability from '../components/Availability';
import CTAStrip from '../components/CTAStrip';
import FAQ from '../components/FAQ';
import LiquidField from '../components/LiquidField';
import config from '../config/api';

const PortfolioHome = () => {
  const lenis = useLenis();
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/projects`);
        const data = await response.json();
        setAllProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setAllProjects([]);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    setScrollPosition(window.scrollY);
    setSelectedProject(project);
    lenis?.scrollTo(0, { immediate: true });
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    requestAnimationFrame(() => {
      lenis?.scrollTo(scrollPosition, { immediate: true });
    });
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = allProjects.findIndex((p) => p.name === selectedProject.name);
    const nextIndex = currentIndex < allProjects.length - 1 ? currentIndex + 1 : 0;
    setSelectedProject(allProjects[nextIndex]);
    lenis?.scrollTo(0, { immediate: true });
  };

  const handlePreviousProject = () => {
    if (!selectedProject) return;
    const currentIndex = allProjects.findIndex((p) => p.name === selectedProject.name);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : allProjects.length - 1;
    setSelectedProject(allProjects[prevIndex]);
    lenis?.scrollTo(0, { immediate: true });
  };

  if (selectedProject) {
    return (
      <div className="min-h-screen relative">
        <LiquidField />
        <div className="relative z-10">
          <ProjectDetail
            project={selectedProject}
            allProjects={allProjects}
            onClose={handleCloseProject}
            onNext={handleNextProject}
            onPrevious={handlePreviousProject}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-zinc-900">
      <LiquidField />
      <div className="relative z-10">
        <Navbar />
        <HeroStack />
        <Services />
        <WhoIWorkWith />
        <Expertise />
        <Projects onProjectClick={handleProjectClick} projects={allProjects} />
        <About />
        <HowIWork />
        <WhyChooseMe />
        <Experience />
        <Availability />
        <CTAStrip />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default PortfolioHome;
