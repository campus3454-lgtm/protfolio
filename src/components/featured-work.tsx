import Image from "next/image";
import { featuredProjects } from "@/data/projects";
import { SectionHead } from "./section-head";
import { ArrowUpRight } from "./icons";
import styles from "./featured-work.module.css";

const delay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

export function FeaturedWork() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          index="02"
          label="Selected work"
          titleId="work-title"
          title={
            <>
              A few pieces from <em className="serif">the archive.</em>
            </>
          }
          intro="Live work, not mockups. Every preview below was captured from the running site and links straight to it."
          meta={
            <a href="#projects" className="arrowLink">
              View all 12 <ArrowUpRight size={15} />
            </a>
          }
        />

        <div className={styles.list}>
          {featuredProjects.map((project, index) => (
            <article
              className={`${styles.feature} ${
                index % 2 === 1 ? styles.reverse : ""
              }`}
              key={project.id}
            >
              <div className={styles.media} data-reveal="mask">
                <a
                  className={styles.frame}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} in a new tab`}
                >
                  <Image
                    src={project.thumbnail}
                    alt={`Screenshot of the ${project.title} website`}
                    fill
                    sizes="(max-width: 900px) 92vw, 58vw"
                    placeholder={project.blurDataURL ? "blur" : "empty"}
                    blurDataURL={project.blurDataURL || undefined}
                    className={styles.image}
                  />
                  <span className={styles.wash} aria-hidden="true" />
                  <span className={styles.open} aria-hidden="true">
                    <ArrowUpRight size={19} />
                  </span>
                </a>
                <div className={styles.caption}>
                  <span className={styles.host}>
                    {new URL(project.url).host}
                  </span>
                  <span className={styles.live}>
                    <span className="statusDot" />
                    Live
                  </span>
                </div>
              </div>

              <div className={styles.copy}>
                <p className={styles.index}>
                  <span className={styles.number}>{project.number}</span>
                  <span className={styles.indexRule} aria-hidden="true" />
                  <span className="micro">{project.category}</span>
                </p>

                <h3 className={styles.title} data-reveal style={delay(60)}>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.title}
                    <span className={styles.titleMark} aria-hidden="true">
                      &#42;
                    </span>
                  </a>
                </h3>

                <p className={styles.description} data-reveal style={delay(120)}>
                  {project.description}
                </p>

                <div className={styles.metaRow} data-reveal style={delay(180)}>
                  <a
                    className="btn btnGhost btnSmall"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} live website (opens in a new tab)`}
                  >
                    View live website <ArrowUpRight size={15} />
                  </a>
                  {project.technologies.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
