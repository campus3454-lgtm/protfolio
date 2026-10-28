"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  countByCategory,
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { ArrowUpRight } from "./icons";
import styles from "./projects.module.css";

type Filter = "All Projects" | ProjectCategory;

const filters: Filter[] = ["All Projects", ...projectCategories];

function countFor(filter: Filter) {
  return filter === "All Projects" ? projects.length : countByCategory(filter);
}

export function ProjectExplorer() {
  const [active, setActive] = useState<Filter>("All Projects");
  const [preview, setPreview] = useState<Project | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const visible =
    active === "All Projects"
      ? projects
      : projects.filter((project) => project.category === active);

  const follow = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    panel.style.transform = `translate3d(${event.clientX - 220}px, ${
      event.clientY - 148
    }px, 0)`;
  }, []);

  return (
    <>
      <div className={styles.controls} data-reveal>
        <div
          className={styles.filterScroll}
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`${styles.filter} ${
                active === filter ? styles.filterActive : ""
              }`}
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
            >
              {filter}
              <span className={styles.filterCount}>{countFor(filter)}</span>
            </button>
          ))}
        </div>
        <p className={styles.resultCount} aria-live="polite">
          {visible.length} of {projects.length} shown
        </p>
      </div>

      <div
        className={styles.index}
        key={active}
        onPointerMove={follow}
        onPointerLeave={() => setPreview(null)}
      >
        {visible.map((project, index) => (
          <a
            className={styles.row}
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ "--row-index": index } as CSSProperties}
            onPointerEnter={() => setPreview(project)}
            onFocus={() => setPreview(project)}
            onBlur={() => setPreview(null)}
            aria-label={`View ${project.title} live website (opens in a new tab)`}
          >
            <span className={styles.rowNumber}>{project.number}</span>

            <span className={styles.thumb}>
              <Image
                src={project.thumbnail}
                alt=""
                fill
                sizes="(max-width: 899px) 96px, 220px"
                placeholder={project.blurDataURL ? "blur" : "empty"}
                blurDataURL={project.blurDataURL || undefined}
                className={styles.thumbImage}
              />
            </span>

            <span className={styles.rowMain}>
              <span className={styles.rowTitle}>
                {project.title}
                <span className={styles.rowMark} aria-hidden="true">
                  &#42;
                </span>
              </span>
              <span className={styles.rowDescription}>
                {project.description}
              </span>
            </span>

            <span className={styles.rowMeta}>
              <span className={styles.rowCategory}>{project.category}</span>
              {project.technologies.length ? (
                <span className={styles.rowTech}>
                  {project.technologies.join(" · ")}
                </span>
              ) : null}
            </span>

            <span className={styles.rowGo} aria-hidden="true">
              <ArrowUpRight size={17} />
            </span>
          </a>
        ))}
      </div>

      <div
        className={styles.preview}
        ref={panelRef}
        data-on={preview ? "true" : "false"}
        aria-hidden="true"
      >
        {preview ? (
          <Image
            src={preview.thumbnail}
            alt=""
            width={440}
            height={286}
            className={styles.previewImage}
          />
        ) : null}
      </div>

      <p className={styles.footnote}>
        Previews were captured from the live sites. Where a site requires
        authentication, its sign-in screen is shown. All links open in a new
        tab.
      </p>
    </>
  );
}
