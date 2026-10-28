import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { SectionHead } from "./section-head";
import { ProjectExplorer } from "./project-explorer";
import styles from "./projects.module.css";

export function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          index="03"
          label="Projects"
          titleId="projects-title"
          title={
            <>
              Twelve live links. <em className="serif">One archive.</em>
            </>
          }
          intro="A working collection of websites, tools and platforms. Filter by type, then open any project in a new tab."
          meta={
            <p className={styles.verified}>
              <span className="statusDot" />
              {projects.length} links verified {site.projectsVerifiedAt}
            </p>
          }
        />

        <ProjectExplorer />
      </div>
    </section>
  );
}
