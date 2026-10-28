import { services } from "@/data/services";
import { serviceWhatsappLink, whatsappLink } from "@/lib/contact";
import { SectionHead } from "./section-head";
import { ArrowUpRight, WhatsApp } from "./icons";
import styles from "./services.module.css";

export function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <SectionHead
          index="04"
          label="Services"
          titleId="services-title"
          title={
            <>
              From first idea to <em className="serif">final deploy.</em>
            </>
          }
          intro="Focused ways I can help — from a single landing page to a complete web application. Every engagement starts with a conversation about what the project actually needs."
          meta={
            <p className={styles.count}>
              <span>{String(services.length).padStart(2, "0")}</span> ways to
              work together
            </p>
          }
        />

        <div className={styles.grid}>
          {services.map((service, index) => (
            <article
              className={styles.service}
              key={service.id}
              data-reveal
              style={
                { "--reveal-delay": `${(index % 2) * 60}ms` } as React.CSSProperties
              }
            >
              <div className={styles.top}>
                <span className={styles.number}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.topLine} aria-hidden="true" />
              </div>

              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>

              <a
                className={styles.enquire}
                href={serviceWhatsappLink(service.enquirySubject)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about ${service.title} on WhatsApp (opens in a new tab)`}
              >
                <WhatsApp size={13} />
                Enquire
                <span className={styles.enquireArrow} aria-hidden="true">
                  <ArrowUpRight size={13} />
                </span>
              </a>
            </article>
          ))}
        </div>

        <div className={styles.foot} data-reveal>
          <p>
            Not sure which one fits?{" "}
            <span className="serif">Describe the problem — not the solution.</span>
          </p>
          <a
            className="btn btnGhost"
            href={whatsappLink(
              "Hello Hashir! I visited your portfolio and I'd like help figuring out the right approach for my project."
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk it through <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
