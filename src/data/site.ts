export const site = {
  name: "Muhammed Hashir",
  firstName: "Muhammed",
  lastName: "Hashir",
  role: "Web Designer & Developer",
  shortRole: "Designer & Developer",
  monogram: "MH",
  location: "India",
  email: "hashimhr3454@gmail.com",
  phoneDisplay: "+91 92070 72726",
  whatsapp: {
    number: "919207072726",
    defaultMessage:
      "Hello Hashir! I visited your portfolio and would like to discuss a website project.",
  },
  instagram: {
    handle: "@4_shir_fz",
    url: "https://www.instagram.com/4_shir_fz/",
  },
  /**
   * LinkedIn is a placeholder until you supply the real profile.
   * Put the public URL in `url`, flip `configured` to `true`, and it appears
   * in the header, contact section and footer. While `false` nothing renders,
   * so there is never a dead link on the site.
   */
  linkedin: {
    url: "https://www.linkedin.com/in/add-your-linkedin-slug",
    configured: false,
  },
  /** Same for GitHub — only set `configured` once the account is public. */
  github: {
    url: "https://github.com/add-your-github-handle",
    configured: false,
  },
  /**
   * Photography. Files live in `public/images/portraits/` and every component
   * reads from here — change a `src` and it updates everywhere.
   *
   * hashir-portrait.jpg  arms crossed, direct to camera  -> hero
   * hashir-speaking.jpg  microphone, mid-talk, smiling   -> about card
   * hashir-candid.jpg    looking off-frame, gesturing    -> statement band
   */
  portrait: {
    hero: {
      src: "/images/portraits/hashir-portrait.jpg",
      alt: "Muhammed Hashir, web designer and developer, standing with arms crossed in white",
    },
    about: {
      src: "/images/portraits/hashir-speaking.jpg",
      alt: "Muhammed Hashir speaking into a microphone",
    },
    wide: {
      src: "/images/portraits/hashir-candid.jpg",
      alt: "Muhammed Hashir mid-conversation, looking away from the camera",
    },
  },
  // Manually control the availability badge shown in the hero, header and footer.
  availability: {
    available: true,
    label: "Available for select projects",
    unavailableLabel: "Currently at capacity",
    note: "Open to freelance projects & collaborations",
  },
  hero: {
    overline: "Portfolio / 2026",
    /** Each entry is one masked line of the oversized headline. */
    headlineLead: ["Designing Digital", "Experiences."],
    headlineAccent: "Building what matters.",
    // Earlier headline, if you ever want it back:
    // headlineLead: ["I Build Digital", "Experiences"],
    // headlineAccent: "That stand out.",
    supporting:
      "I'm Muhammed Hashir, a web designer and developer focused on creating modern, responsive, and engaging digital experiences.",
    primaryCta: "Explore my work",
    secondaryCta: "Let's build something",
    portraitCaption: "The designer behind the work",
  },
  /**
   * The kinetic band between the hero and About. Each entry is one statement
   * uncovered by a copper block. These are deliberately their own lines —
   * nothing repeats the About heading, and no entry claims a client, an award
   * or a project count.
   */
  statement: {
    lines: [
      "Most websites are built to be looked at.",
      "I build them to be used.",
      "Clear on a small screen, first.",
    ],
    /** The line rendered in the serif accent face. */
    accentLine: 1,
  },
  about: {
    eyebrow: "About",
    heading: {
      line1: "Design is how it",
      accent: "feels.",
      line2: "Development is how it holds up.",
    },
    intro: [
      "I'm Muhammed Hashir, a web designer and developer from India. I build websites that feel considered from the first frame to the last interaction — clear in structure, confident in type, and comfortable on every screen.",
      "My work sits between design and engineering. I care about how an idea is understood, how a page moves, and how the whole thing holds up when real people use it on real devices.",
    ],
    quote: "Good design gets attention. Good development earns trust.",
    principles: [
      {
        title: "Clarity before decoration",
        body: "Every section should answer a question. If it doesn't, it doesn't belong.",
      },
      {
        title: "Built for the real device",
        body: "The phone in someone's hand is the real design review — not the artboard.",
      },
      {
        title: "Details that earn trust",
        body: "Type, spacing, loading and motion all say something about the brand behind them.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Conversation",
        body: "We start with what the site needs to do, who it is for, and what a successful outcome looks like.",
      },
      {
        step: "02",
        title: "Direction",
        body: "I shape the structure, typography and visual language around that goal before writing the interface.",
      },
      {
        step: "03",
        title: "Build",
        body: "The design becomes responsive, accessible code that can handle real content and real devices.",
      },
      {
        step: "04",
        title: "Refine",
        body: "Performance, edge cases and the small interactions that make the finished thing feel effortless.",
      },
    ],
  },
  footerNote: "Designed and built by Muhammed Hashir.",
  footerBlurb:
    "Designing and building modern, responsive websites from India.",
  projectsVerifiedAt: "October 2026",
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type NavItem = (typeof navItems)[number];

export const meta = {
  title: "Muhammed Hashir — Web Designer & Developer",
  description:
    "Muhammed Hashir is a web designer and developer from India creating modern, responsive and engaging digital experiences. Explore 12 live projects and start a conversation.",
  ogImage: "/og.jpg",
  ogImageAlt:
    "Muhammed Hashir — Web Designer & Developer, portrait and portfolio title",
} as const;
