import styles from "./marquee.module.css";

const items = [
  "Web design",
  "Development",
  "Interaction",
  "Responsive",
  "Performance",
  "Detail",
];

export function Marquee() {
  return (
    <div className={styles.band} aria-hidden="true">
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div className={styles.group} key={copy}>
            {items.map((item) => (
              <span className={styles.item} key={`${copy}-${item}`}>
                {item}
                <span className={styles.star}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
