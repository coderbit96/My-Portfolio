import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import AuroraBackground from "@/components/animations/AuroraBackground";
import ScrollProgressBar from "@/components/animations/ScrollProgressBar";
import { publicAssetUrl } from "@/lib/publicAssetUrl";

const resumeHref = publicAssetUrl("resume/Joydip-Ghosh-Resume.pdf");
const resumePreviewHref = publicAssetUrl("resume/pdf");

export const metadata: Metadata = {
  title: {
    absolute: "Joydip Ghosh Resume | Full Stack Developer"
  },
  description:
    "Preview and download the resume of Joydip Ghosh, a Full Stack Developer, Web Developer and Website Developer based in Kolkata, India.",
  alternates: {
    canonical: "/resume"
  },
  openGraph: {
    title: "Joydip Ghosh Resume | Full Stack Developer",
    description:
      "Preview the professional resume of Joydip Ghosh, Full Stack Developer and Website Developer in Kolkata.",
    url: "/resume",
    type: "profile",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Joydip Ghosh Full-Stack Developer resume"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Joydip Ghosh Resume | Full Stack Developer",
    description:
      "Preview the professional resume of Joydip Ghosh, Full Stack Developer and Website Developer in Kolkata.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Joydip Ghosh Full-Stack Developer resume"
      }
    ]
  }
};

export default function ResumePage() {
  return (
    <>
      <AuroraBackground />
      <ScrollProgressBar />
      <main className="resume-page relative z-10">
        <section className="section-shell">
          <Link href="/#about" className="case-study-back-link">
            <FaArrowLeft aria-hidden="true" />
            Back to portfolio
          </Link>

          <div className="resume-page__header">
            <div>
              <p className="case-study-kicker">Resume / CV</p>
              <h1>Joydip Ghosh Resume</h1>
              <p>
                Preview the current resume in your browser, or download the PDF
                for offline review.
              </p>
            </div>

            <div className="resume-page__actions">
              <a
                href={resumeHref}
                download="Joydip-Ghosh-Resume.pdf"
                className="project-link project-link--primary"
                aria-label="Download Joydip Ghosh resume PDF"
                data-cursor="link"
              >
                Download CV
                <FaDownload aria-hidden="true" />
              </a>
              <a
                href={resumePreviewHref}
                target="_blank"
                rel="noreferrer"
                className="project-link"
                aria-label="Open Joydip Ghosh resume PDF in a new tab"
                data-cursor="link"
              >
                Open PDF
                <FaExternalLinkAlt aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="resume-page__viewer">
            <object
              data={resumePreviewHref}
              type="application/pdf"
              aria-label="Joydip Ghosh resume PDF preview"
            >
              <iframe
                src={resumePreviewHref}
                title="Joydip Ghosh resume PDF preview"
                loading="lazy"
              />
              <p>
                Your browser cannot display the resume preview here. You can
                still open the PDF in a new tab or download it.
              </p>
            </object>
          </div>
        </section>
      </main>
    </>
  );
}
