"use client";

import React from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { useTheme } from "../context/ThemeContext";

const Testimonials = () => {
  const { colors } = useTheme();
  const testimonials = [
    {
      quote:
        "Excellent work! Delivered exactly what we needed on time. The application is fast, scalable, and user-friendly. The developer demonstrated exceptional technical expertise and great communication throughout the project.",
      name: "Sarah Chen",
      designation: "CEO, TechFlow - SaaS Platform Development",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "Professional developer who understands business needs. Great communication and technical expertise. The full-stack web application exceeded our expectations and was delivered ahead of schedule.",
      name: "Michael Rodriguez",
      designation: "Founder, InnovateSphere - Full-Stack Web Application",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "The LMS platform exceeded our expectations. Students love the interface and it has improved our operations significantly. The developer was responsive, professional, and delivered a high-quality solution.",
      name: "Emily Watson",
      designation: "Director, Educational Institution - LMS Platform",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "Outstanding work on our e-commerce platform. The developer created a robust, scalable solution with excellent user experience. Payment integration was seamless and the platform handles high traffic efficiently.",
      name: "James Kim",
      designation: "E-Commerce Lead - E-Commerce Platform",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "The analytics dashboard is exactly what we needed. Real-time data visualization and comprehensive reporting features have transformed how we analyze our business metrics. Highly recommended!",
      name: "Lisa Thompson",
      designation: "Analytics Manager - Dashboard Analytics",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "Working with this developer was a pleasure. They delivered a modern, responsive corporate website with smooth animations and fast loading times. The SEO optimization has significantly improved our online presence.",
      name: "David Park",
      designation: "Marketing Director - Corporate Website",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Client Feedback
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
            What clients say about working with me
          </p>
        </div>

        <div className="flex items-center justify-center">
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>
      </div>
    </section>
  );
};


export default Testimonials;

