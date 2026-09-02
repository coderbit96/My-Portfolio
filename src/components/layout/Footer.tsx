import { FaArrowUp, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { navItems } from "@/data/navigation";
import { socials } from "@/data/socials";
import CopyEmailButton from "@/components/ui/CopyEmailButton";

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-cyanGlow/50 bg-ink">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-goldGlow" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-cyanGlow/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 pb-7 pt-14 sm:px-6">
        <div className="grid gap-10 border-b border-cyanGlow/30 pb-10 lg:grid-cols-[1.25fr_0.75fr_1fr] lg:gap-14">
          <section aria-labelledby="footer-brand-title">
            <div className="flex items-center gap-4">
              <span className="grid h-[5rem] w-[5rem] shrink-0 place-items-center overflow-hidden rounded-2xl border border-goldGlow/80 bg-transparent shadow-neon">
                <Image
                  src="/images/logo.png"
                  alt="Joydip Ghosh logo"
                  width={80}
                  height={80}
                  quality={100}
                  className="h-full w-full object-cover"
                />
              </span>
              <div>
                <h2 id="footer-brand-title" className="text-[1.8rem] font-black text-white sm:text-[2.15rem]">Joydip Ghosh</h2>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              <span className="inline-block rounded-md border border-goldGlow/60 bg-cyanGlow/30 px-2 py-0.5 font-black tracking-wide text-goldGlow">
                Full-Stack Developer
              </span>
            </p>
            <CopyEmailButton email="joydip.work.mail@gmail.com" />
          </section>

          <nav aria-label="Footer navigation">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-goldGlow">Explore</p>
            <ul className="mt-5 flex flex-wrap gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={`/${item.href}`}
                    className="group inline-flex min-h-9 items-center gap-1.5 rounded-[8px] px-2 text-xs font-semibold text-slate-300 transition hover:bg-cyanGlow/15 hover:text-goldGlow focus:bg-cyanGlow/15 focus:text-goldGlow focus:outline-none"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyanGlow transition group-hover:bg-goldGlow" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-connect-title">
            <p id="footer-connect-title" className="text-xs font-bold uppercase tracking-[0.26em] text-goldGlow">Connect</p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">
              Have a project in mind? Let's create something that feels clear and works beautifully.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="me noreferrer"
                    className="footer-social-link group relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-cyanGlow/45 bg-cyanGlow/10 text-mintGlow transition duration-300 hover:-translate-y-1 hover:scale-110 hover:border-goldGlow hover:bg-goldGlow hover:text-ink focus:-translate-y-1 focus:scale-110 focus:border-goldGlow focus:bg-goldGlow focus:text-ink focus:outline-none"
                    aria-label={item.label}
                    data-cursor="link"
                  >
                    <Icon className="relative z-[1] transition-transform duration-300 group-hover:rotate-12 group-focus:rotate-12" />
                  </a>
                );
              })}
            </div>
          </section>
        </div>

        <div className="footer-meta flex flex-col gap-3 pb-20 pt-6 text-xs font-semibold text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:pb-0">
          <p>© {new Date().getFullYear()} Joydip Ghosh. All rights reserved.</p>
          <a
            href="#home"
            className="inline-flex min-h-8 w-fit items-center gap-1.5 rounded-md border border-brandBlue/45 bg-brandBlue/10 px-2.5 text-xs font-bold text-accentCyan transition hover:-translate-y-0.5 hover:border-accentCyan/70 hover:bg-brandBlue/18 hover:text-primary focus-visible:-translate-y-0.5 focus-visible:border-accentCyan/70 focus-visible:text-primary focus:outline-none"
          >
            Back to top <FaArrowUp />
          </a>
        </div>
      </div>
      <div className="whatsapp-float fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <a
          href="https://wa.me/919641212416"
          target="_blank"
          rel="noreferrer"
          className="group relative grid h-12 w-12 place-items-center rounded-full border border-goldGlow/60 bg-goldGlow text-2xl text-ink shadow-[0_0_28px_rgba(244,244,244,0.42)] transition duration-300 hover:scale-110 hover:shadow-[0_0_38px_rgba(244,244,244,0.62)] focus:outline-none focus:ring-2 focus:ring-goldGlow focus:ring-offset-2 focus:ring-offset-ink sm:h-14 sm:w-14"
          aria-label="Chat with Joydip on WhatsApp"
          title="Chat on WhatsApp"
          data-cursor="link"
        >
          <span className="whatsapp-pulse pointer-events-none absolute inset-0 rounded-full border-2 border-goldGlow" aria-hidden="true" />
          <span className="dark-surface pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-[8px] border border-white/10 bg-ink/95 px-3 py-2 text-xs font-semibold text-slate-100 opacity-0 shadow-card backdrop-blur-xl transition duration-200 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100">
            Please Free To Contact Me
          </span>
          <FaWhatsapp className="relative z-[1]" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
