import Link from "next/link";
import { site } from "@/data/site";
import styles from "./logo.module.css";

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="#home"
      className={`${styles.logo} ${footer ? styles.footer : ""}`}
      aria-label={`${site.name} — back to top`}
    >
      <span className={styles.mark} aria-hidden="true">
        <span className={styles.letters}>{site.monogram}</span>
        <span className={styles.dot} />
      </span>
      <span className={styles.word}>{site.name}</span>
    </Link>
  );
}
