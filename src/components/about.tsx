import Image from "next/image";
import { site } from "@/data/site";
import { SectionHead } from "./section-head";
import { ArrowUpRight, Plus } from "./icons";
import styles from "./about.module.css";

export function About() {
  const available = site.availability.available;

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          index="01"
          label={site.about.eyebrow}
          titleId="about-title"
          wide
          title={
            <>
              {site.about.heading.line1}{" "}
              <em className="serif">{site.about.heading.accent}</em>
              <br />
              {site.about.heading.line2}
            </>
          }
        />

        <div className={styles.grid}>
          <aside className={styles.side} data-reveal>
            <figure className={styles.portraitCard}>
              <div className={styles.imageWrap}>
                <Image
                  src={site.portrait.about.src}
                  alt={site.portrait.about.alt}
                  fill
                  sizes="(max-width: 900px) 88vw, 380px"
                  className={styles.image}
                />
                <span className={styles.tint} aria-hidden="true" />
                <span className={styles.plateTop} aria-hidden="true">
                  <span>{site.monogram}</span>
                  <span>{site.location} / 2026</span>
                </span>
                <figcaption className={styles.plateCaption}>
                  <span className="micro">The person behind the pixels</span>
                  <p className="serif">A designer who builds.</p>
                </figcaption>
              </div>
            </figure>

            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt>Based in</dt>
                <dd>{site.location}</dd>
              </div>
              <div className={styles.fact}>
                <dt>Focus</dt>
                <dd>Web design &amp; development</dd>
              </div>
              <div className={styles.fact}>
                <dt>Status</dt>
                <dd className={styles.status}>
                  <span className="statusDot" data-offline={!available} />
                  {available
                    ? site.availability.label
                    : site.availability.unavailableLabel}
                </dd>
              </div>
            </dl>
          </aside>

          <div className={styles.story}>
            <p className={styles.lede} data-reveal>
              {site.about.intro[0]}
            </p>
            <p className={styles.secondary} data-reveal>
              {site.about.intro[1]}
            </p>

            <blockquote className={styles.quote} data-reveal>
              <span className={styles.quoteMark} aria-hidden="true">
                &ldquo;
              </span>
              <p className="serif">{site.about.quote}</p>
            </blockquote>

            <div className={styles.principles}>
              {site.about.principles.map((principle, index) => (
                <div
                  className={styles.principle}
                  key={principle.title}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <span className={styles.principleIcon} aria-hidden="true">
                    <Plus size={12} />
                  </span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.ctaRow} data-reveal>
              <a href="#work" className="arrowLink">
                See selected work <ArrowUpRight size={16} />
              </a>
              <a href="#contact" className="arrowLink">
                Start a conversation <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.process} data-reveal>
          <div className={styles.processHead}>
            <span className="eyebrow">
              <span className="eyebrowIndex">↳</span>
              How I work
            </span>
            <p>Four steps, no black boxes.</p>
          </div>

          <ol className={styles.steps}>
            {site.about.process.map((step, index) => (
              <li
                className={styles.step}
                key={step.step}
                style={{ "--step-index": index } as React.CSSProperties}
              >
                <span className={styles.stepNum}>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
