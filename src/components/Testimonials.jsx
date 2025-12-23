"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Excellent work! Delivered exactly what we needed on time. The application is fast, scalable, and user-friendly. The developer demonstrated exceptional technical expertise and great communication throughout the project.",
      name: "Client Name",
      title: "CEO, Company Name - SaaS Platform Development",
    },
    {
      quote:
        "Professional developer who understands business needs. Great communication and technical expertise. The full-stack web application exceeded our expectations and was delivered ahead of schedule.",
      name: "Client Name",
      title: "Founder, Startup - Full-Stack Web Application",
    },
    {
      quote:
        "The LMS platform exceeded our expectations. Students love the interface and it has improved our operations significantly. The developer was responsive, professional, and delivered a high-quality solution.",
      name: "Client Name",
      title: "Director, Educational Institution - LMS Platform",
    },
    {
      quote:
        "Outstanding work on our e-commerce platform. The developer created a robust, scalable solution with excellent user experience. Payment integration was seamless and the platform handles high traffic efficiently.",
      name: "Client Name",
      title: "E-Commerce Client - E-Commerce Platform",
    },
    {
      quote:
        "The analytics dashboard is exactly what we needed. Real-time data visualization and comprehensive reporting features have transformed how we analyze our business metrics. Highly recommended!",
      name: "Client Name",
      title: "Analytics Company - Dashboard Analytics",
    },
    {
      quote:
        "Working with this developer was a pleasure. They delivered a modern, responsive corporate website with smooth animations and fast loading times. The SEO optimization has significantly improved our online presence.",
      name: "Client Name",
      title: "Corporate Client - Corporate Website",
    },
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Client Feedback
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
            What clients say about working with me
          </p>
        </div>

        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

