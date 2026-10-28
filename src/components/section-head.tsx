import type { CSSProperties, ReactNode } from "react";

type SectionHeadProps = {
  index: string;
  label: string;
  title: ReactNode;
  titleId?: string;
  intro?: ReactNode;
  meta?: ReactNode;
  wide?: boolean;
};

export function SectionHead({
  index,
  label,
  title,
  titleId,
  intro,
  meta,
  wide,
}: SectionHeadProps) {
  return (
    <div className="sectionHead" data-reveal>
      <div>
        <span className="eyebrow">
          <span className="eyebrowIndex">{index}</span>
          {label}
        </span>
        {meta ? <div style={{ marginTop: 22 }}>{meta}</div> : null}
      </div>
      <div className="sectionHeadMain">
        <h2
          id={titleId}
          className={`sectionTitle ${wide ? "sectionTitleWide" : ""}`}
          style={{ "--reveal-delay": "40ms" } as CSSProperties}
        >
          {title}
        </h2>
        {intro ? <p className="sectionIntro">{intro}</p> : null}
      </div>
    </div>
  );
}
