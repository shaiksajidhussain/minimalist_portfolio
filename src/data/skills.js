import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiCss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiDocker,
  SiStripe,
  SiFramer,
  SiAngular,
  SiCodeigniter,
  SiFlutter,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

export const GOLD = '#d4af37';
export const INK = '#1c1917';
export const CREAM = '#f4efe6';

export const SKILLS = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'CSS', icon: SiCss },
  { name: 'HTML', icon: SiHtml5 },
  { name: 'Framer', icon: SiFramer },
  { name: 'Angular', icon: SiAngular },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express', icon: SiExpress },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Postgres', icon: SiPostgresql },
  { name: 'MySQL', icon: SiMysql },
  { name: 'Prisma', icon: SiPrisma },
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Docker', icon: SiDocker },
  { name: 'AWS', icon: FaAws },
  { name: 'Stripe', icon: SiStripe },
  { name: 'CodeIgniter', icon: SiCodeigniter },
];

export const SKILL_GROUPS = [
  {
    title: 'Interface',
    kicker: '01',
    items: SKILLS.slice(0, 10),
  },
  {
    title: 'Systems',
    kicker: '02',
    items: SKILLS.slice(10, 16),
  },
  {
    title: 'Craft',
    kicker: '03',
    items: SKILLS.slice(16),
  },
];
