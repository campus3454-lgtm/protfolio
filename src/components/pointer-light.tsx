"use client";

import { useEffect, useRef } from "react";
import { shouldLimitMotion } from "@/lib/motion";
import styles from "./pointer-light.module.css";

export function PointerLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (shouldLimitMotion()) return;

    let targetX = window.innerWidth * 0.72;
    let targetY = window.innerHeight * 0.24;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;
      element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (
        Math.abs(targetX - currentX) > 0.4 ||
        Math.abs(targetY - currentY) > 0.4
      ) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      element.dataset.active = "true";
      if (!frame) frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className={styles.light} aria-hidden="true" />;
}
