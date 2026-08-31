import { FaEnvelope, FaGithub, FaLinkedinIn, FaMapMarkerAlt } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/animations/Reveal";
import { socials } from "@/data/socials";
import { contactEmail, contactLocation } from "@/data/profile";

const githubHref = socials.find((social) => social.label === "GitHub")?.href ?? "https://github.com/coderbit96";
const linkedinHref = socials.find((social) => social.label === "LinkedIn")?.href ?? "https://www.linkedin.com";

const contactDetails = [
  {
    label: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    icon: FaEnvelope,
    external: false
  },
  {
    label: "GitHub",
    value: githubHref.replace("https://", ""),
    href: githubHref,
    icon: FaGithub,
    external: true
  },
  {
    label: "LinkedIn",
    value: "View profile",
    href: linkedinHref,
    icon: FaLinkedinIn,
    external: true
  },
  {
    label: "Location",
    value: contactLocation,
    href: undefined,
    icon: FaMapMarkerAlt,
    external: false
  }
];

export default function Contact() {
  return (
    <section className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great."
          description="Open to job opportunities, collaboration, freelance projects, and technical conversations — share a few details and I'll get back to you soon."
        />
        <div className="mx-auto max-w-4xl">
          <Reveal amount={0.25} className="glass rounded-[8px] p-5 sm:p-7">
            <ContactForm />

            <div className="contact-details mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                const content = (
                  <>
                    <span className="contact-details__icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="contact-details__label">{detail.label}</span>
                      <span className="contact-details__value">{detail.value}</span>
                    </span>
                  </>
                );

                return detail.href ? (
                  <a
                    key={detail.label}
                    href={detail.href}
                    target={detail.external ? "_blank" : undefined}
                    rel={detail.external ? "noreferrer" : undefined}
                    className="contact-details__item"
                    data-cursor={detail.external ? "link" : undefined}
                    aria-label={detail.label}
                  >
                    {content}
                  </a>
                ) : (
                  <span key={detail.label} className="contact-details__item contact-details__item--static">
                    {content}
                  </span>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
