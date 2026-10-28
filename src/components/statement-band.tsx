import Image from "next/image";
import { site } from "@/data/site";
import styles from "./statement-band.module.css";

/**
 * Three statements, each uncovered by a copper block that sweeps across it.
 * The copy lives in `site.statement` — it is a point of view about the work,
 * not a claim about clients, awards or project counts.
 */
const { lines, accentLine } = site.statement;

export function StatementBand() {
  return (
    <section id="statement" className={styles.band} aria-label="How I approach the work">
      <div className={`container ${styles.inner}`}>
        <div className={styles.media}>
          <Image
            src={site.portrait.wide.src}
            alt={site.portrait.wide.alt}
            fill
            sizes="(max-width: 900px) 88vw, 420px"
            className={styles.image}
          />
          <span className={styles.mediaTint} aria-hidden="true" />
        </div>

        <ul className={styles.lines}>
          {lines.map((line, index) => (
            <li
              key={line}
              className={styles.line}
              data-reveal="block"
              data-accent={index === accentLine || undefined}
              style={
                {
                  "--reveal-delay": `${index * 190}ms`,
                } as React.CSSProperties
              }
            >
              <span className={styles.block} aria-hidden="true" />
              <span className={styles.text}>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
