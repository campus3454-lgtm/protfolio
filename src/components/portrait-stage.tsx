"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { shouldLimitMotion } from "@/lib/motion";
import styles from "./portrait-stage.module.css";

/**
 * The portrait is the hero's main subject: an edge-dissolved panel that bleeds
 * to the viewport, lit by a warm key that follows the pointer on desktop and
 * drifts with the scroll on every device.
 */
export function PortraitStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const media = mediaRef.current;
    const light = lightRef.current;
    const plate = plateRef.current;
    const wordmark = wordmarkRef.current;
    const floor = floorRef.current;
    if (!stage || !media || !light || !plate || !wordmark || !floor) return;
    if (shouldLimitMotion()) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollShift = 0;
    let inside = false;
    let frame = 0;
    let running = false;

    const apply = () => {
      media.style.transform = `translate3d(${(currentX * 14).toFixed(2)}px, ${(
        currentY * 10 - scrollShift
      ).toFixed(2)}px, 0) scale(1.02)`;
      plate.style.transform = `translate3d(0, ${(scrollShift * -0.55).toFixed(
        2
      )}px, 0)`;
      wordmark.style.transform = `translate3d(${(-currentX * 26).toFixed(
        2
      )}px, ${(scrollShift * 0.42).toFixed(2)}px, 0)`;
      // `translate` composes with the floor's own perspective `transform`.
      floor.style.translate = `0 ${(scrollShift * -0.28).toFixed(2)}px`;
      light.style.setProperty("--mx", `${50 + currentX * 30}%`);
      light.style.setProperty("--my", `${26 + currentY * 20 + scrollShift * 0.12}%`);
    };

    const tick = () => {
      const before = currentX + currentY;
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;
      const nextShift = Math.min(
        46,
        (window.scrollY / Math.max(1, window.innerHeight)) * 46
      );
      scrollShift = nextShift;
      apply();

      const settled =
        Math.abs(targetX - currentX) < 0.001 &&
        Math.abs(targetY - currentY) < 0.001 &&
        Math.abs(before - (currentX + currentY)) < 0.0005;

      if (settled && !inside) {
        running = false;
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      targetX = Math.max(-1, Math.min(1, x));
      targetY = Math.max(-1, Math.min(1, y));
      inside = true;
      start();
    };

    const settle = () => {
      inside = false;
      targetX = 0;
      targetY = 0;
      start();
    };

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", settle);
    window.addEventListener("scroll", start, { passive: true });
    start();

    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", settle);
      window.removeEventListener("scroll", start);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.stage} ref={stageRef}>
      <div className={styles.reveal}>
        <div className={styles.media} ref={mediaRef}>
          <Image
            src={site.portrait.hero.src}
            alt={site.portrait.hero.alt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, (max-width: 1400px) 58vw, 760px"
            quality={88}
            className={styles.image}
          />
          <span className={styles.key} aria-hidden="true" />
          <span className={styles.light} ref={lightRef} aria-hidden="true" />
          <span className={styles.scrim} aria-hidden="true" />
        </div>
      </div>

      {/* Depth set: the oversized surname and the receding floor. They sit over
          the photograph but only where the scrim has already dissolved it into
          the page, so they read as the space behind the subject. */}
      <div className={styles.depth} aria-hidden="true">
        <div className={styles.floorWrap}>
          <div className={styles.floor} ref={floorRef} />
        </div>
        <div className={styles.wordmark} ref={wordmarkRef}>
          <span className="serif">{site.lastName}</span>
        </div>
      </div>

      <span className={styles.rim} aria-hidden="true" />

      <div className={styles.plate} ref={plateRef}>
        <span className={styles.plateMark}>{site.monogram}</span>
        <span className={styles.plateLine} aria-hidden="true" />
        <span className={styles.plateRole}>{site.role}</span>
      </div>

      <p className={styles.hint} aria-hidden="true">
        <span className={styles.hintDot} />
        Move to light
      </p>
    </div>
  );
}
