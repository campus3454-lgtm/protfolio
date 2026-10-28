export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

export function isLowPowerDevice() {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as NavigatorWithHints;
  return (
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4 ||
    nav.connection?.saveData === true
  );
}

export function shouldLimitMotion() {
  return prefersReducedMotion() || isLowPowerDevice();
}
