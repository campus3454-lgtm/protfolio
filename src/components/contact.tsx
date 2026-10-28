import { site } from "@/data/site";
import { emailLink, whatsappLink } from "@/lib/contact";
import { SectionHead } from "./section-head";
import { EnquiryForm } from "./enquiry-form";
import { CopyEmail } from "./copy-email";
import {
  ArrowUpRight,
  Instagram,
  Mail,
  WhatsApp,
} from "./icons";
import styles from "./contact.module.css";

export function Contact() {
  const available = site.availability.available;

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead
          index="06"
          label="Contact"
          titleId="contact-title"
          wide
          title={
            <>
              Have a project in mind?{" "}
              <em className="serif">Let&apos;s make it stand out.</em>
            </>
          }
          intro="Tell me what you're building, what's getting in the way, or simply say hello. Use whichever channel is easiest for you."
        />

        <div className={styles.grid}>
          <div className={styles.channels} data-reveal>
            <a
              className={styles.primary}
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start a WhatsApp conversation with Muhammed Hashir"
            >
              <span className={styles.primaryIcon}>
                <WhatsApp size={20} />
              </span>
              <span className={styles.primaryBody}>
                <span className="micro">WhatsApp / preferred</span>
                <span className={styles.primaryValue}>{site.phoneDisplay}</span>
                <span className={styles.primaryNote}>
                  Opens a chat with the project message already written.
                </span>
              </span>
              <span className={styles.primaryArrow} aria-hidden="true">
                <ArrowUpRight size={17} />
              </span>
            </a>

            <div className={styles.row}>
              <span className={styles.rowIcon} aria-hidden="true">
                <Mail size={17} />
              </span>
              <div className={styles.rowBody}>
                <span className="micro">Email</span>
                <a href={emailLink} className={styles.rowValue}>
                  {site.email}
                </a>
              </div>
              <CopyEmail />
            </div>

            <a
              className={styles.row}
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile (opens in a new tab)"
            >
              <span className={styles.rowIcon} aria-hidden="true">
                <Instagram size={17} />
              </span>
              <span className={styles.rowBody}>
                <span className="micro">Instagram</span>
                <span className={styles.rowValue}>{site.instagram.handle}</span>
              </span>
              <span className={styles.rowArrow} aria-hidden="true">
                <ArrowUpRight size={16} />
              </span>
            </a>

            <div className={styles.availability}>
              <span className="statusDot" data-offline={!available} />
              <div>
                <p>
                  {available
                    ? site.availability.label
                    : site.availability.unavailableLabel}
                </p>
                <span>{site.availability.note}</span>
              </div>
            </div>

            <p className={styles.channelsNote}>
              Based in {site.location}. Working with people wherever the
              project is.
            </p>
          </div>

          <div className={styles.formWrap} data-reveal>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
