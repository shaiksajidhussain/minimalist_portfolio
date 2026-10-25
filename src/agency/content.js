export const BRAND = {
  name: 'Sajid',
  label: 'Portfolio',
  email: 'sanjusazid0@gmail.com',
  phone: '+91 7893160318',
  phoneHref: 'tel:+917893160318',
  region: 'Hyderabad, India',
  socials: [
    { label: 'GitHub', href: 'https://github.com/shaiksajidhussain' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shaiksajidhussain' },
    { label: 'YouTube', href: 'https://www.youtube.com/@codewithsanjuu' },
  ],
};

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/process', label: 'Process' },
  { to: '/contact', label: 'Contact' },
];

export const SERVICES = [
  {
    id: 'websites',
    number: '01',
    title: 'Website Design',
    summary: 'A site that explains the offer, loads cleanly, and gives a buyer a clear next step.',
    problem: 'The current site looks borrowed, buries the offer, or fails on a phone.',
    deliver: 'Information architecture, interface design, and a production website.',
    approach: 'We start from the pages a buyer actually needs, then design and build those before anything decorative.',
    capabilities: ['Responsive interface', 'Content structure', 'Performance-minded frontend', 'Analytics-ready markup'],
    value: 'People understand what you sell without a call to translate the website.',
  },
  {
    id: 'web-apps',
    number: '02',
    title: 'Web Application Development',
    summary: 'Custom tools for the work your spreadsheets and off-the-shelf software keep dropping.',
    problem: 'Operations live in inboxes, duplicate entry, and software that almost fits.',
    deliver: 'A scoped web application with the roles, flows, and data your team named up front.',
    approach: 'We write the jobs to be done, cut the scope to a first release, then build against that list.',
    capabilities: ['React interfaces', 'API integration', 'Auth and roles', 'Dashboards and internal tools'],
    value: 'A daily workflow gets shorter because the software matches the work.',
  },
  {
    id: 'mobile',
    number: '03',
    title: 'Mobile Application Development',
    summary: 'Phone apps for products that people open away from a desk.',
    problem: 'The service needs a thumb-friendly flow, and a mobile website is not enough.',
    deliver: 'A React Native application with the core journeys, empty states, and a build you can ship.',
    approach: 'We design the smallest set of screens that complete the job, then implement them for iOS and Android.',
    capabilities: ['React Native', 'API-backed screens', 'Navigation and state', 'Store-ready builds'],
    value: 'Customers can finish the task on a phone without a workaround.',
  },
  {
    id: 'growth',
    number: '04',
    title: 'Digital Marketing & Business Growth',
    summary: 'Positioning, pages, and campaigns that send the right people to a product worth opening.',
    problem: 'Traffic arrives on a vague page, or the offer never reaches the people who would buy it.',
    deliver: 'Offer messaging, landing pages, and a practical channel plan tied to the product.',
    approach: 'We pair the page with the channel. Ads and content point at a specific action, not a generic homepage.',
    capabilities: ['Offer and page messaging', 'Landing pages', 'Search and content basics', 'Campaign structure'],
    value: 'Marketing effort lands on a page that can actually take the enquiry.',
  },
];

export const PROCESS = [
  {
    number: '01',
    title: 'Discover',
    text: 'Understand the business, audience, challenges, and goals.',
  },
  {
    number: '02',
    title: 'Strategize',
    text: 'Define scope, requirements, priorities, and what a useful first release includes.',
  },
  {
    number: '03',
    title: 'Design',
    text: 'Set the visual direction, the flows, and the interface.',
  },
  {
    number: '04',
    title: 'Build',
    text: 'Develop, integrate, and tighten the product against the agreed scope.',
  },
  {
    number: '05',
    title: 'Launch',
    text: 'Test, deploy, watch the first real use, and hand the work over.',
  },
  {
    number: '06',
    title: 'Grow',
    text: 'Continue with optimization only when that work is part of the agreement.',
  },
];

export const BUDGETS = [
  'Not sure yet',
  'Under $5,000',
  '$5,000–$15,000',
  '$15,000–$40,000',
  '$40,000+',
];

export const EXPERIENCE = [
  {
    number: '01',
    company: 'Kiora Care',
    role: 'Founding Engineer',
    duration: 'Feb 2026 — Present',
    points: [
      'Build end-to-end applications, from the first design through development, deployment, and testing',
      'Ship AI automations into the product workflow',
      'Run the digital marketing that brings the right people to what we launch',
    ],
    technologies: ['Design', 'Development', 'Deployment', 'Testing', 'AI automation', 'Digital marketing'],
  },
  {
    number: '02',
    company: 'QubicGen',
    role: 'MERN Stack Developer → Team Lead',
    duration: 'Jan 2024 — Jan 2026',
    points: [
      'Started as a MERN Stack Developer and progressed to Team Lead, managing a team of 7 junior developers',
      'Delivered QubicGen Portfolio, QMES, LMS, and Vidynatra',
      'Built the company site in React with Express and MongoDB',
      'Ran KT sessions and mentored junior developers',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Figma'],
  },
  {
    number: '03',
    company: 'Freelance / Consulting',
    role: 'Full-Stack Developer',
    duration: '2023 — Present',
    points: [
      'Shipped portfolio and product sites for AJ Supplements, Feed Formulate, Bhavani Chits, and Project Genie',
      'Built dashboards with access control for financial data',
      'Handled SEO, responsive UI, and overlapping client timelines',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Express', 'SEO'],
  },
  {
    number: '04',
    company: 'Inspire Leap',
    role: 'Full-Stack Developer',
    duration: '2024',
    points: [
      'Built a portfolio with an integrated dashboard',
      'Delivered an LMS portal with access control',
      'Owned development, deploy, and ongoing maintenance',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'REST API'],
  },
  {
    number: '05',
    company: 'Melody Mocktails',
    role: 'MERN Stack Developer',
    duration: 'Jun 2024 — Dec 2024',
    points: [
      'Delivered three projects in a four-month engagement',
      'Built MERN apps with Figma, Tailwind, and Bootstrap',
      'Balanced the work alongside other client commitments',
    ],
    technologies: ['Next.js', 'React', 'Express', 'MongoDB', 'Jira', 'Bitbucket'],
  },
  {
    number: '06',
    company: 'SRIC',
    role: 'Frontend Developer Intern',
    duration: '2022',
    points: [
      "Designed and built SRIC's public website",
      'Integrated a secure database for user information',
      'Shipped responsive React and Material UI screens',
    ],
    technologies: ['React', 'Material UI', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    number: '07',
    company: 'Skilync',
    role: 'Web Designer Intern',
    duration: 'Jun 2022 — Aug 2022',
    points: [
      'Hands-on web design and rapid prototyping',
      'Worked in FlutterFlow for product mocks',
      'Explored cloud-based delivery for web apps',
    ],
    technologies: ['FlutterFlow', 'Cloud'],
  },
];

export const SKILL_GROUPS = [
  {
    number: '01',
    title: 'Interface',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind', 'CSS', 'HTML', 'Framer', 'Angular', 'Flutter'],
  },
  {
    number: '02',
    title: 'Systems',
    items: ['Node.js', 'Express', 'MongoDB', 'Postgres', 'MySQL', 'Prisma'],
  },
  {
    number: '03',
    title: 'Craft',
    items: ['Git', 'GitHub', 'Docker', 'AWS', 'Stripe', 'CodeIgniter'],
  },
];

export const CLIENTS = [
  {
    number: '01',
    title: 'Startups & Founders',
    text: 'MVP development with fast execution and architecture that can grow past the first release.',
  },
  {
    number: '02',
    title: 'Small-Medium Businesses',
    text: 'Custom systems to streamline operations and turn messy workflows into a product you can run.',
  },
  {
    number: '03',
    title: 'SaaS Companies',
    text: 'Production-grade applications with performance, reliability, and room to add the next feature.',
  },
  {
    number: '04',
    title: 'Agencies',
    text: 'White-label support and extra hands when your team needs to ship without stretching thin.',
  },
  {
    number: '05',
    title: 'E-Commerce Businesses',
    text: 'Full-stack storefronts with payments, inventory, and the unglamorous bits that keep orders moving.',
  },
  {
    number: '06',
    title: 'Digital Agencies',
    text: 'Web development and design implementation for the clients already on your roster.',
  },
];

export const WHY = [
  {
    number: '01',
    title: 'Three years in product',
    text: 'SaaS platforms, learning systems, and React Native apps — shipped work, not tutorial stacks.',
  },
  {
    number: '02',
    title: 'Performance as default',
    text: 'Lighthouse, SEO, and load time are treated as features, not a pass at the end.',
  },
  {
    number: '03',
    title: 'Architecture that lasts',
    text: 'Maintainable structure so the next person — or future-you — can keep building.',
  },
  {
    number: '04',
    title: 'Direct communication',
    text: 'You talk to the person writing the code. Updates without theatre.',
  },
  {
    number: '05',
    title: 'Real product surfaces',
    text: 'Payments, auth, dashboards, and backends that hold actual users.',
  },
];

export const HOW = [
  {
    number: '01',
    title: 'Discover',
    text: 'We clarify the problem, audience, and constraints before writing a line of code.',
    note: 'Brief · Scope · What not to build',
  },
  {
    number: '02',
    title: 'Design',
    text: 'Structure, UI, and technical plan are agreed so the build stays focused.',
    note: 'Architecture · UI direction · Sequence',
  },
  {
    number: '03',
    title: 'Build',
    text: 'Clean, production-ready development with regular check-ins and visible progress.',
    note: 'Working increments you can click through',
  },
  {
    number: '04',
    title: 'Ship',
    text: 'Launch, polish, and handoff — with support so the product stays stable.',
    note: 'Live product · Handoff · Support window',
  },
];
