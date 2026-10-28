"use client";

import { useRef, useState, type FormEvent } from "react";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { whatsappBaseUrl } from "@/lib/contact";
import { ArrowUpRight, ChevronDown, WhatsApp } from "./icons";
import styles from "./contact.module.css";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = {
  tone: "idle" | "success" | "error";
  message: string;
  link?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EnquiryForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ tone: "idle", message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== "type" && errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status.tone !== "idle") setStatus({ tone: "idle", message: "" });
  };

  const validate = () => {
    const next: Errors = {};
    if (values.name.trim().length < 2) {
      next.name = "Please enter your name.";
    }
    if (values.email.trim() && !emailPattern.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (values.message.trim().length < 10) {
      next.message = "Tell me a little more — at least 10 characters.";
    }

    setErrors(next);
    const first = (["name", "email", "message"] as FieldName[]).find(
      (field) => next[field]
    );

    if (first) {
      const field = formRef.current?.querySelector<
        HTMLInputElement | HTMLTextAreaElement
      >(`[name="${first}"]`);
      field?.focus();
      setStatus({
        tone: "error",
        message: "Please check the highlighted fields.",
      });
      return false;
    }
    return true;
  };

  const buildMessage = () => {
    const lines = [
      `Hello Hashir! I'm ${values.name.trim()}.`,
      `I'm interested in ${
        values.type || "a website project"
      }.`,
      values.message.trim(),
      values.email.trim() ? `You can reach me at ${values.email.trim()}.` : "",
    ];
    return lines.filter(Boolean).join("\n\n");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const url = `${whatsappBaseUrl}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setStatus({
      tone: "success",
      message:
        "WhatsApp is opening in a new tab with your message. If it didn't open, use the direct link below.",
      link: url,
    });
  };

  const onEmail = () => {
    if (!validate()) return;

    const subject = `Website enquiry${
      values.type ? ` — ${values.type}` : ""
    } from ${values.name.trim()}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildMessage())}`;
    window.location.href = href;

    setStatus({
      tone: "success",
      message:
        "Your email app should open with the enquiry prepared. Nothing is sent until you press send there.",
    });
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.formHead}>
        <div>
          <span className="micro">Project enquiry</span>
          <h3>Start a project</h3>
        </div>
        <span className={styles.formBadge}>No data stored</span>
      </div>

      <p className={styles.formNote}>
        This form prepares a WhatsApp message for you to send. Nothing is
        submitted to or stored on this website.
      </p>

      <form
        ref={formRef}
        noValidate
        onSubmit={onSubmit}
        className={styles.form}
        aria-describedby="form-status"
      >
        <div className={styles.twoCols}>
          <div className={styles.field}>
            <label htmlFor="name">
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="Your name"
            />
            {errors.name ? (
              <span id="name-error" className={styles.error} role="alert">
                {errors.name}
              </span>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">
              Email <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="you@example.com"
            />
            {errors.email ? (
              <span id="email-error" className={styles.error} role="alert">
                {errors.email}
              </span>
            ) : null}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="type">What do you need?</label>
          <div className={styles.selectWrap}>
            <select
              id="type"
              name="type"
              value={values.type}
              onChange={(event) => update("type", event.target.value)}
            >
              <option value="">Select a project type</option>
              {services.map((service) => (
                <option value={service.title} key={service.id}>
                  {service.title}
                </option>
              ))}
              <option value="Something else">Something else</option>
            </select>
            <ChevronDown size={16} className={styles.selectIcon} />
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="message">
              Project details <span aria-hidden="true">*</span>
            </label>
            <span className={styles.counter}>{values.message.length}/600</span>
          </div>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={600}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="What are you building, and what should it do?"
          />
          {errors.message ? (
            <span id="message-error" className={styles.error} role="alert">
              {errors.message}
            </span>
          ) : null}
        </div>

        <div className={styles.submitRow}>
          <button type="submit" className={`btn btnPrimary ${styles.submit}`}>
            <WhatsApp size={16} />
            Continue on WhatsApp
            <ArrowUpRight size={16} />
          </button>
          <button
            type="button"
            className={`btn btnGhost ${styles.submit}`}
            onClick={onEmail}
          >
            Open email draft instead
          </button>
        </div>

        <div
          className={`${styles.status} ${
            status.tone === "success"
              ? styles.statusSuccess
              : status.tone === "error"
                ? styles.statusError
                : ""
          }`}
          id="form-status"
          aria-live="polite"
        >
          {status.message ? (
            <p>
              {status.message}
              {status.link ? (
                <>
                  {" "}
                  <a
                    href={status.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open WhatsApp <ArrowUpRight size={13} />
                  </a>
                </>
              ) : null}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
