import projectBlur from "./project-blur.json";

export const projectCategories = [
  "Web Applications",
  "Business Websites",
  "Tools & Platforms",
  "Other Projects",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  url: string;
  category: ProjectCategory;
  thumbnail: string;
  blurDataURL: string;
  /** Only technologies confirmed by inspecting the live site. */
  technologies: string[];
  featured: boolean;
  status: "Live" | "Unverified";
};

const blur = projectBlur as Record<string, string>;

function project(
  data: Omit<Project, "thumbnail" | "blurDataURL" | "status">
): Project {
  return {
    ...data,
    thumbnail: `/images/projects/${data.id}.webp`,
    blurDataURL: blur[data.id] ?? "",
    status: "Live",
  };
}

/**
 * All project links verified over HTTP on 2026-10-27.
 * Edit names, descriptions, categories and `featured` flags here.
 * Screenshots live in public/images/projects/<id>.webp.
 */
export const projects: Project[] = [
  project({
    id: "01-markaz-bilal-results",
    number: "01",
    title: "Markaz Bilal Results",
    description:
      "A results and achievements dashboard for Markaz Bilal, presenting unit standings, achiever totals and event results.",
    url: "https://markazbilal-results.web.app/",
    category: "Web Applications",
    technologies: ["Firebase Hosting"],
    featured: true,
  }),
  project({
    id: "02-score-table",
    number: "02",
    title: "Score Table",
    description:
      "A league-table interface for Score Table, built around team standings and season tabs.",
    url: "https://scoretablefb1.vercel.app/",
    category: "Web Applications",
    technologies: [],
    featured: false,
  }),
  project({
    id: "03-mbp-sports",
    number: "03",
    title: "MBP Sports",
    description: "A full-screen web presence for MBP Sports.",
    url: "https://Mbp-sports.vercel.app",
    category: "Business Websites",
    technologies: [],
    featured: false,
  }),
  project({
    id: "04-digilocker-issues",
    number: "04",
    title: "DigiLocker Issues",
    description:
      "An issue register for Shree Vidyadhiraja College students to report and track DigiLocker problems.",
    url: "https://digilocker-issues809.vercel.app/",
    category: "Tools & Platforms",
    technologies: [],
    featured: false,
  }),
  project({
    id: "05-emaron-mp3",
    number: "05",
    title: "Emmaron MP3",
    description:
      "A single-purpose music search experience with one focused input and a dark, minimal interface.",
    url: "https://emaronmp3.vercel.app",
    category: "Tools & Platforms",
    technologies: ["Next.js"],
    featured: false,
  }),
  project({
    id: "06-emw-hub",
    number: "06",
    title: "EMW Hub",
    description:
      "A works hub for browsing recent EM Works entries, with search and quick navigation.",
    url: "https://Emw-hub.vercel.app",
    category: "Tools & Platforms",
    technologies: ["Next.js"],
    featured: false,
  }),
  project({
    id: "07-campus-hub",
    number: "07",
    title: "Campus Hub",
    description:
      "A student-union portal for NDSU, bringing events, notices, academics and campus resources together.",
    url: "https://hubcampus.vercel.app",
    category: "Web Applications",
    technologies: ["Next.js"],
    featured: true,
  }),
  project({
    id: "08-mizan-forum",
    number: "08",
    title: "Mizan Forum",
    description:
      "A registration and information site for the Mizan Forum knowledge festival.",
    url: "https://mizanforum.vercel.app",
    category: "Other Projects",
    technologies: [],
    featured: true,
  }),
  project({
    id: "09-hptyws911-admin",
    number: "09",
    title: "HPTYWS911 Admin",
    description:
      "The protected administration sign-in for the HPTYWS911 platform.",
    url: "https://hptyws911.vercel.app/admin",
    category: "Web Applications",
    technologies: [],
    featured: false,
  }),
  project({
    id: "10-deyanza",
    number: "10",
    title: "Deyanza",
    description:
      "A clean, focused sign-in gateway for the Deyanza platform.",
    url: "https://deyanza.vercel.app/",
    category: "Web Applications",
    technologies: ["Next.js"],
    featured: false,
  }),
  project({
    id: "11-knk-cement-store",
    number: "11",
    title: "KNK Cement Store",
    description:
      "The staff sign-in for KNK Cement Stores' stock and shop management.",
    url: "https://knkcementstore.vercel.app",
    category: "Business Websites",
    technologies: ["Next.js"],
    featured: false,
  }),
  project({
    id: "12-haxflow-overview",
    number: "12",
    title: "Haxflow Overview",
    description:
      "The access screen for Hax Flow's overview route, gated behind a PIN.",
    url: "https://haxflow.vercel.app/overview",
    category: "Tools & Platforms",
    technologies: [],
    featured: false,
  }),
];

export const featuredProjects = projects.filter((project) => project.featured);

export function countByCategory(category: ProjectCategory): number {
  return projects.filter((project) => project.category === category).length;
}
