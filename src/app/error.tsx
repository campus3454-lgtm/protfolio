"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section">
      <div className="container" style={{ paddingBlock: "80px" }}>
        <span className="eyebrow">
          <span className="eyebrowIndex">!</span>
          Something went wrong
        </span>
        <h1
          style={{
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
            marginTop: "24px",
            maxWidth: "16ch",
          }}
        >
          This page hit a snag.
        </h1>
        <p className="sectionIntro" style={{ marginTop: "18px" }}>
          The portfolio itself is still here. Try loading the section again.
        </p>
        <button
          type="button"
          className="btn btnPrimary"
          style={{ marginTop: "28px" }}
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </section>
  );
}
