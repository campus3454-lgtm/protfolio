import { navItems, site } from "@/data/site";
import { emailLink, whatsappLink } from "@/lib/contact";
import { Logo } from "./logo";
import {
  ArrowDown,
  ArrowUpRight,
  GitHub,
  Instagram,
  LinkedIn,
  Mail,
  WhatsApp,
} from "./icons";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const available = site.availability.available;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo footer />
            <p className={styles.role}>{site.role}</p>
            <p className={styles.blurb}>{site.footerBlurb}</p>
            <div className={styles.status}>
              <span className="statusDot" data-offline={!available} />
              {available
                ? site.availability.label
                : site.availability.unavailableLabel}
            </div>
          </div>

          <nav className={styles.column} aria-label="Footer navigation">
            <p className="micro">Sitemap</p>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <p className="micro">Connect</p>
            <ul>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp (opens in a new tab)"
                >
                  <WhatsApp size={14} />
                  WhatsApp
                  <ArrowUpRight size={12} className={styles.linkArrow} />
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram profile (opens in a new tab)"
                >
                  <Instagram size={14} />
                  Instagram
                  <ArrowUpRight size={12} className={styles.linkArrow} />
                </a>
              </li>
              <li>
                <a href={emailLink} className={styles.email}>
                  <Mail size={14} />
                  <span className={styles.emailText}>
                    {site.email.split("@")[0]}
                    <wbr />@{site.email.split("@")[1]}
                  </span>
                </a>
              </li>
              {site.linkedin.configured ? (
                <li>
                  <a
                    href={site.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile (opens in a new tab)"
                  >
                    <LinkedIn size={14} />
                    LinkedIn
                    <ArrowUpRight size={12} className={styles.linkArrow} />
                  </a>
                </li>
              ) : null}
              {site.github.configured ? (
                <li>
                  <a
                    href={site.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile (opens in a new tab)"
                  >
                    <GitHub size={14} />
                    GitHub
                    <ArrowUpRight size={12} className={styles.linkArrow} />
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className={styles.column}>
            <p className="micro">Next step</p>
            <a className={`btn btnSmall btnPrimary ${styles.cta}`} href="#contact">
              Start a project <ArrowUpRight size={15} />
            </a>
            <a className={styles.backTop} href="#home">
              Back to top
              <span className={styles.backIcon} aria-hidden="true">
                <ArrowDown size={13} />
              </span>
            </a>
          </div>
        </div>

        <p className={styles.watermark} aria-hidden="true">
          Hashir
        </p>

        <div className={styles.bottom}>
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.footerNote}</p>
          <p className={styles.location}>
            {site.location}
            <span aria-hidden="true"> / </span>
            {site.availability.note}
          </p>
        </div>
      </div>
    </footer>
  );
}
