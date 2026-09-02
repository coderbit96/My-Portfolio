import type { Metadata } from "next";
import PortfolioPage from "@/components/layout/PortfolioPage";

export const metadata: Metadata = {
  title: {
    absolute: "Joydip Ghosh | Full Stack Developer, Web Developer & Website Developer"
  },
  description:
    "Joydip Ghosh is a Full Stack Developer, Web Developer and Website Developer in Kolkata, India, building React, Next.js, MERN and custom web applications.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Joydip Ghosh | Full Stack Developer, Web Developer & Website Developer",
    description:
      "Portfolio of Joydip Ghosh, a Full Stack Developer in Kolkata building React, Next.js, MERN and custom website experiences.",
    url: "/",
    type: "profile"
  },
  twitter: {
    card: "summary_large_image",
    title: "Joydip Ghosh | Full Stack Developer",
    description: "Full Stack Developer, Web Developer and Website Developer in Kolkata, India."
  }
};

export default function HomePage() {
  return <PortfolioPage />;
}
