import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ paddingBlock: "100px" }}>
        <span className="eyebrow">
          <span className="eyebrowIndex">404</span>
          Page not found
        </span>
        <h1
          style={{
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
            marginTop: "24px",
            maxWidth: "16ch",
          }}
        >
          That page isn&apos;t part of this portfolio.
        </h1>
        <p className="sectionIntro" style={{ marginTop: "18px" }}>
          The work, services and contact details all live on the main page.
        </p>
        <Link
          href="/"
          className="btn btnPrimary"
          style={{ marginTop: "28px" }}
        >
          Back to the portfolio
        </Link>
      </div>
    </section>
  );
}
