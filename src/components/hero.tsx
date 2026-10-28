import { site } from "@/data/site";
import { emailLink, whatsappLink } from "@/lib/contact";
import {
  ArrowDown,
  ArrowUpRight,
  GitHub,
  Instagram,
  LinkedIn,
  Mail,
  WhatsApp,
} from "@/components/icons";
import { PortraitStage } from "@/components/portrait-stage";
import styles from "./hero.module.css";

const lineDelay = (ms: number) =>
  ({ "--line-delay": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const available = site.availability.available;

  return (
    <section
      id="home"
      className={styles.hero}
      aria-labelledby="hero-title"
      data-section="home"
    >
      <div className={styles.photo}>
        <PortraitStage />
      </div>

      <div className={`container ${styles.inner}`}>
        <p className={styles.meta}>
          <span className={styles.availability}>
            <span className="statusDot" data-offline={!available} />
            {available
              ? site.availability.label
              : site.availability.unavailableLabel}
          </span>
          <span className={styles.metaItem}>
            <span>{site.role}</span>
            <span className={styles.metaDot} aria-hidden="true" />
            <span>{site.location}</span>
          </span>
        </p>

        <h1 id="hero-title" className={styles.title}>
          <span className={`${styles.nameLine} lineMask`} style={lineDelay(120)}>
            <span>{site.firstName}</span>
          </span>
          <span className={`${styles.nameLine} lineMask`} style={lineDelay(210)}>
            <span className={styles.lastName}>
              {site.lastName}
              <span className={styles.mark} aria-hidden="true">
                &#42;
              </span>
            </span>
          </span>
          <span
            className={`${styles.statementLine} lineMask`}
            style={lineDelay(320)}
          >
            <span>
              {site.hero.headlineLead[0]} {site.hero.headlineLead[1]}
            </span>
          </span>
          <span
            className={`${styles.statementLine} lineMask`}
            style={lineDelay(400)}
          >
            <span className={styles.statementAccent}>
              <em className="serif">{site.hero.headlineAccent}</em>
            </span>
          </span>
        </h1>

        <p className={styles.supporting} data-reveal style={{ "--reveal-delay": "620ms" } as React.CSSProperties}>
          {site.hero.supporting}
        </p>

        <div className={styles.actions}>
          <a href="#work" className="btn btnPrimary">
            {site.hero.primaryCta}
            <ArrowDown size={17} />
          </a>
          <a href="#contact" className="btn btnGhost">
            {site.hero.secondaryCta}
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className={styles.connect}>
          <span className="micro">Elsewhere</span>
          <div className={styles.socials}>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
              aria-label="Instagram profile (opens in a new tab)"
            >
              <Instagram size={15} />
              <span>Instagram</span>
              <ArrowUpRight size={12} />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
              aria-label="WhatsApp (opens in a new tab)"
            >
              <WhatsApp size={15} />
              <span>WhatsApp</span>
              <ArrowUpRight size={12} />
            </a>
            <a href={emailLink} className={styles.social} aria-label="Send an email to Muhammed Hashir">
              <Mail size={15} />
              <span>Email</span>
            </a>
            {site.linkedin.configured ? (
              <a
                href={site.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                <LinkedIn size={15} />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} />
              </a>
            ) : null}
            {site.github.configured ? (
              <a
                href={site.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
                aria-label="GitHub profile (opens in a new tab)"
              >
                <GitHub size={15} />
                <span>GitHub</span>
                <ArrowUpRight size={12} />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className={styles.cueRow}>
        <a href="#about" className={styles.scrollCue}>
          <span className={styles.scrollLine} aria-hidden="true">
            <span />
          </span>
          Scroll to explore
        </a>
        <p className={styles.footerIndex} aria-hidden="true">
          01 / 06
        </p>
      </div>
    </section>
  );
}
