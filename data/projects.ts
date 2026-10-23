export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  shortDescription: string;
  overview: string;
  challengeSolution: string;
  stack: string[];
  techDecision: string;
  image: string;
  images: string[];
  liveUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: "dinepine",
    title: "DinePine",
    subtitle: "MERN Stack Restaurant POS System",
    category: "Full Stack Development",
    shortDescription:
      "Full-stack restaurant point-of-sale system eliminating billing latency and order miscommunication during peak hours.",
    overview:
      "Engineered a full-stack POS system to eliminate billing latency and order miscommunication during peak hours. Built the interactive React order management dashboard, Node.js REST API endpoints, and MongoDB document schemas.",
    challengeSolution:
      "High-frequency concurrent order submissions from table tablets caused database state conflicts. Solved by implementing optimistic UI rendering combined with atomic MongoDB update operations ($inc and $push) to process concurrent orders with zero transactional lock latency.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
    techDecision:
      "Chosen for its flexible document schema allowing dynamic menu item modifiers and sub-second JSON response payloads.",
    image: "/projects/dinepine.png",
    images: [
      "/projects/dinepine.png",
      "/projects/dinepine_dash.png",
      "/projects/dinepine_bill.png",
    ],
    liveUrl: "https://dinepine-pos.vercel.app",
    githubUrl: "https://github.com/code-with-saad/POS",
  },
  {
    id: "a1uniforms",
    title: "A1 Uniforms",
    subtitle: "E-Commerce Catalog with Client-Side Filtering",
    category: "Frontend Development",
    shortDescription:
      "Responsive e-commerce catalog with real-time multi-attribute filtering across medical, academic, and workwear product lines.",
    overview:
      "Designed a responsive e-commerce web catalog allowing customers to filter uniforms across medical, academic, and workwear lines without page reloads. Created modern UI components and high-performance filtering logic.",
    challengeSolution:
      "Multi-attribute filter combinations (category, size, and search text) caused layout thrashing and DOM re-render delays. Solved by constructing an in-memory normalized product matrix with debounced inputs, cutting filter compute time to < 2ms.",
    stack: ["JavaScript (ES6+)", "HTML5", "CSS3 / Tailwind", "Vercel"],
    techDecision:
      "Vanilla JS eliminated framework bundle overhead, guaranteeing sub-100ms LCP on low-tier mobile hardware.",
    image: "/projects/a1uniforms.png",
    images: [
      "/projects/a1uniforms.png",
      "/projects/a1uniforms_grid.png",
      "/projects/a1uniforms_filter.png",
    ],
    liveUrl: "https://a1uniforms.vercel.app",
    githubUrl: "https://github.com/code-with-saad/E-PROJECT",
  },
  {
    id: "covidcare",
    title: "COVID Care",
    subtitle: "PHP & MySQL Vaccination Management System",
    category: "Full Stack & Database",
    shortDescription:
      "Centralized healthcare portal for citizen vaccination scheduling, hospital dose allocation, and certificate verification.",
    overview:
      "Architected a centralized healthcare management portal for citizen vaccination scheduling, hospital dose allocation, and certificate verification. Designed relational database schemas, PHP session auth, and admin dashboards.",
    challengeSolution:
      "Simultaneous patient requests for remaining vaccination slots posed a critical double-booking risk. Solved by implementing MySQL InnoDB row-level database locks (SELECT ... FOR UPDATE) inside atomic PHP database transactions.",
    stack: ["PHP 8", "MySQL", "Bootstrap", "HTML5/CSS3", "InfinityFree"],
    techDecision:
      "MySQL relational schema enforced strict foreign key constraints and ACID transactional integrity across appointment centers.",
    image: "/projects/covidcare.png",
    images: [
      "/projects/covidcare.png",
      "/projects/covidcare_form.png",
      "/projects/covidcare_admin.png",
    ],
    liveUrl: "https://covid-care.infinityfree.io",
    githubUrl: "https://github.com/code-with-saad/Covid-Care",
  },
];
