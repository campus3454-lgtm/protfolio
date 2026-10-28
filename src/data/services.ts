export type Service = {
  id: string;
  title: string;
  description: string;
  /** Used to compose the prefilled WhatsApp enquiry message. */
  enquirySubject: string;
};

/** Editable service offerings — deliberately no prices or delivery promises. */
export const services: Service[] = [
  {
    id: "business-websites",
    title: "Business Website Development",
    description:
      "A clear, credible online home for your business, structured around what your visitors actually need to know.",
    enquirySubject: "a business website",
  },
  {
    id: "portfolio-websites",
    title: "Personal Portfolio Websites",
    description:
      "A distinctive portfolio that presents your work with the care and clarity it deserves.",
    enquirySubject: "a personal portfolio website",
  },
  {
    id: "product-showcase",
    title: "Product Showcase Websites",
    description:
      "Product-led pages that make the details, differences and value easy to understand.",
    enquirySubject: "a product showcase website",
  },
  {
    id: "responsive-design",
    title: "Responsive Web Design",
    description:
      "Layouts that stay composed and readable from a small phone to a wide desktop.",
    enquirySubject: "responsive web design",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Interface structure, visual systems and user flows shaped around real tasks.",
    enquirySubject: "UI/UX design",
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    description:
      "A considered refresh for a site that feels dated, unclear or harder to use than it should be.",
    enquirySubject: "a website redesign",
  },
  {
    id: "web-applications",
    title: "Web Application Development",
    description:
      "Interactive tools and dashboards built as working interfaces, not static mockups.",
    enquirySubject: "a web application",
  },
  {
    id: "performance",
    title: "Website Performance Optimization",
    description:
      "Faster loading, leaner assets and smoother interactions on the devices people actually use.",
    enquirySubject: "website performance optimization",
  },
  {
    id: "maintenance",
    title: "Website Maintenance",
    description:
      "Ongoing updates, fixes and refinements that keep a live site healthy and current.",
    enquirySubject: "website maintenance",
  },
];

export type SkillGroup = {
  label: string;
  items: { name: string; note: string }[];
};

/**
 * A working toolkit, not a scorecard. Only list tools you are comfortable
 * discussing in an interview; add or remove entries freely.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: "Design",
    items: [
      { name: "UI/UX Design", note: "Structure, flows & interface systems" },
      { name: "Responsive Design", note: "Layouts that hold up on real screens" },
      { name: "Visual Systems", note: "Type, colour & spacing with intent" },
      { name: "Interaction Design", note: "Motion with a purpose" },
    ],
  },
  {
    label: "Build",
    items: [
      { name: "HTML", note: "Semantic, accessible structure" },
      { name: "CSS", note: "Layout, responsive styling & animation" },
      { name: "JavaScript", note: "Interface logic & browser APIs" },
      { name: "React", note: "Component-driven interfaces" },
      { name: "Next.js", note: "Production web applications" },
      { name: "Firebase", note: "Hosting & application services" },
    ],
  },
  {
    label: "Workflow",
    items: [
      { name: "Git", note: "Version control" },
      { name: "GitHub", note: "Repositories & collaboration" },
    ],
  },
];
