"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { Check, Copy } from "./icons";
import styles from "./contact.module.css";

type CopyStatus = "idle" | "copied" | "error";

export function CopyEmail() {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const announce = (next: CopyStatus) => {
    setStatus(next);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2400);
  };

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(site.email);
        announce("copied");
        return;
      }
      const textarea = document.createElement("textarea");
      textarea.value = site.email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textarea);
      announce(success ? "copied" : "error");
    } catch {
      announce("error");
    }
  };

  return (
    <div className={styles.copyWrap}>
      <button
        type="button"
        className={styles.copyButton}
        onClick={copy}
        aria-label={`Copy email address ${site.email}`}
      >
        {status === "copied" ? <Check size={14} /> : <Copy size={14} />}
        <span>{status === "copied" ? "Copied" : "Copy"}</span>
      </button>
      <span className="srOnly" role="status" aria-live="polite">
        {status === "copied"
          ? "Email address copied to clipboard"
          : status === "error"
            ? `Copy failed. The email address is ${site.email}`
            : ""}
      </span>
    </div>
  );
}
