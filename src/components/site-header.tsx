"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navItems, site } from "@/data/site";
import { whatsappLink } from "@/lib/contact";
import { Logo } from "./logo";
import {
  ArrowUpRight,
  Close,
  MenuIcon,
  Moon,
  Sun,
  WhatsApp,
} from "./icons";
import styles from "./site-header.module.css";

type Theme = "dark" | "light";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const ids = navItems.map((item) => item.id);
    const scanIds = [...ids.slice(0, 2), "work", ...ids.slice(2)];

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 18);

      const doc = document.documentElement;
      const progress = doc.scrollHeight - window.innerHeight;
      headerRef.current?.style.setProperty(
        "--progress",
        progress > 0 ? String(Math.min(1, window.scrollY / progress)) : "0"
      );

      const marker = window.scrollY + window.innerHeight * 0.34;
      let current = "home";

      for (const id of scanIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = id;
      }
      if (current === "work") current = "projects";

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
      ) {
        current = "contact";
      }

      setActive((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = menuRef.current;
    const trigger = menuButtonRef.current;

    const focusables = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        )
      : [];

    const focusTimer = window.setTimeout(() => focusables[0]?.focus(), 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const current: Theme = root.dataset.theme === "light" ? "light" : "dark";
    const next: Theme = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    root.style.colorScheme = next;
    try {
      window.localStorage.setItem("mh-theme", next);
    } catch {
      /* storage may be unavailable in private modes */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#0a0908" : "#f5f2ec");
  }, []);

  const navigate = useCallback((id: string) => {
    setOpen(false);
    window.requestAnimationFrame(() => {
      const section = document.getElementById(id);
      if (!section) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    });
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
          open ? styles.menuOpen : ""
        }`}
      >
        <span className={styles.progress} aria-hidden="true" />
        <div className={styles.inner}>
          <Logo />

          <nav className={styles.nav} aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${styles.navLink} ${
                  active === item.id ? styles.navLinkActive : ""
                }`}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.themeButton}
              onClick={toggleTheme}
              aria-label="Toggle colour theme"
              title="Toggle colour theme"
            >
              <span className={styles.themeIconDark} aria-hidden="true">
                <Moon size={17} />
              </span>
              <span className={styles.themeIconLight} aria-hidden="true">
                <Sun size={17} />
              </span>
            </button>

            <a
              className={styles.talk}
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Muhammed Hashir on WhatsApp"
            >
              <WhatsApp size={15} />
              <span>Let&apos;s talk</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuButton}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <Close size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={styles.mobile}
        data-open={open ? "true" : "false"}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className={styles.mobileInner}>
          <p className={styles.mobileKicker}>
            <span className={styles.mobileIndex}>MENU</span>
            {site.availability.label}
          </p>

          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${styles.mobileLink} ${
                  active === item.id ? styles.mobileLinkActive : ""
                }`}
                style={{ "--link-index": index } as React.CSSProperties}
                aria-current={active === item.id ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(item.id);
                }}
              >
                <span className={styles.mobileNum}>0{index + 1}</span>
                <span>{item.label}</span>
                <ArrowUpRight size={22} className={styles.mobileArrow} />
              </a>
            ))}
          </nav>

          <div className={styles.mobileFooter}>
            <a href={`mailto:${site.email}`} className={styles.mobileContact}>
              {site.email}
            </a>
            <div className={styles.mobileSocials}>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="arrowLink"
              >
                WhatsApp <ArrowUpRight size={15} />
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="arrowLink"
              >
                Instagram <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
