import { site } from "@/data/site";

export const whatsappBaseUrl = `https://wa.me/${site.whatsapp.number}`;

export function whatsappLink(message: string = site.whatsapp.defaultMessage) {
  return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export function serviceWhatsappLink(service: string) {
  return whatsappLink(
    `Hello Hashir! I visited your portfolio and I'm interested in ${service}. Could we discuss my project?`
  );
}

export const emailLink = `mailto:${site.email}`;
