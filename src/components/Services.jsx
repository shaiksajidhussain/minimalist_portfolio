import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Random image placeholder using Unsplash or Placeholder service
  const getRandomImage = (index) => {
    const images = [
      `https://www.keenesystems.com/hubfs/blog-images/ux-ui.jpg`,
      `https://lh7-rt.googleusercontent.com/docsz/AD_4nXfpH5jkmDQ7HelQcaPh5lMKwfW2Bx6I0hDhlg3mrNwXlLXO1lmwofaYS_1a8211DPJqhb-z5cLtDYfFkjA1EUKfNOEfTJCSWUKXSIY4pams0g4xGBWrqYMLC_yy1izmQgj1SwM6vg?key=8Icro23PLHSLRmHd-kIQoO0c`,
      `https://www.addwebsolution.com/wp-content/uploads/2024/03/SaaS-Product-Development.jpg`,
      `https://cdn.prod.website-files.com/6448bf6f064020ce1b2ca19d/6448bf6f0640204bbb2ca41c_shawayo%20odd%20pages%20(4).png`,
      `https://media.geeksforgeeks.org/wp-content/uploads/20240618105133/User-Interface-Design-Stages-1.webp`,
      `https://www.advancedtech.com/wp-content/uploads/2023/11/What-is-Asset-Performance-Optimization_Image-1_1200x628.jpg`,
      `https://www.prorealtech.com/wp-content/uploads/2024/09/bug-fixing.jpg`,
    ];
    return images[index % images.length];
  };

  const Skeleton = ({ imageUrl }) => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 overflow-hidden relative">
      <img 
        src={imageUrl} 
        alt="service" 
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/bento:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-700" />
    </div>
  );

  const items = [
    {
      title: ' UI/UX Design & Development ',
      description: 'React / Next.js applications with modern UI/UX',
      header: <Skeleton imageUrl={getRandomImage(0)} />,
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'Full-Stack Development',
      description: 'MERN / PERN stack solutions from frontend to backend',
      header: <Skeleton imageUrl={getRandomImage(1)} />,
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'SaaS Product Development',
      description: 'Scalable SaaS platforms with subscription management',
      header: <Skeleton imageUrl={getRandomImage(2)} />,
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'API Development & Integration',
      description: 'RESTful APIs, third-party integrations, and microservices',
      header: <Skeleton imageUrl={getRandomImage(3)} />,
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'UI Implementation from Figma',
      description: 'Pixel-perfect designs converted to responsive code',
      header: <Skeleton imageUrl={getRandomImage(4)} />,
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'Performance Optimization',
      description: 'Speed optimization, code splitting, and lazy loading',
      header: <Skeleton imageUrl={getRandomImage(5)} />,
      icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: 'Bug Fixing & Maintenance',
      description: 'Debugging, refactoring, and ongoing support',
      header: <Skeleton imageUrl={getRandomImage(6)} />,
      icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center"
          >
            Services
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg"
          >
            What problems I solve for clients
          </motion.p>

          <BentoGrid className="max-w-6xl mx-auto">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

