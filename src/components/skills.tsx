import { skillGroups } from "@/data/services";
import { SectionHead } from "./section-head";
import { Plus } from "./icons";
import styles from "./skills.module.css";

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          index="05"
          label="Skills"
          titleId="skills-title"
          title={
            <>
              A toolkit, not a <em className="serif">scorecard.</em>
            </>
          }
          intro="The tools I reach for when designing and building. No percentage bars, no badges — just the stack behind the work."
        />

        <div className={styles.layout}>
          <aside className={styles.aside} data-reveal>
            <p className={styles.quote}>
              &ldquo;Good tools don&apos;t make the work.{" "}
              <span className="serif">Intent does.</span>&rdquo;
            </p>
            <p className={styles.note}>
              I care more about how a decision serves the person using the site
              than about adding another logo to a list. The toolkit stays
              deliberately short: design, front-end fundamentals and a clean
              workflow.
            </p>
            <div className={styles.asideCard}>
              <span className={`${styles.asideIndex} micro`}>
                Practice / 01
              </span>
              <p>
                Design with intent. Build for the device in someone&apos;s hand.
                Test the details before calling it done.
              </p>
            </div>
          </aside>

          <div className={styles.groups}>
            {skillGroups.map((group, groupIndex) => (
              <div
                className={styles.group}
                key={group.label}
                data-reveal
                style={
                  {
                    "--reveal-delay": `${groupIndex * 70}ms`,
                  } as React.CSSProperties
                }
              >
                <div className={styles.groupHead}>
                  <span className={styles.groupNumber}>
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  <h3>{group.label}</h3>
                  <span className={styles.groupLine} aria-hidden="true" />
                </div>

                <ul className={styles.items}>
                  {group.items.map((item) => (
                    <li className={styles.item} key={item.name}>
                      <span className={styles.itemIcon} aria-hidden="true">
                        <Plus size={10} />
                      </span>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemNote}>{item.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
