import type { Metadata } from "next";
import PortfolioPage from "@/components/layout/PortfolioPage";

export const metadata: Metadata = {
  title: {
    absolute: "Joydip Ghosh | AI Full Stack Developer, Web Developer & Website Developer"
  },
  description:
    "Joydip Ghosh is an AI Full Stack Developer, Web Developer and Website Developer in Kolkata, India, building React, Next.js, MERN and custom web applications.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Joydip Ghosh | AI Full Stack Developer, Web Developer & Website Developer",
    description:
      "Portfolio of Joydip Ghosh, an AI Full Stack Developer in Kolkata building React, Next.js, MERN and custom website experiences.",
    url: "/",
    type: "profile"
  },
  twitter: {
    card: "summary_large_image",
    title: "Joydip Ghosh | AI Full Stack Developer",
    description: "AI Full Stack Developer, Web Developer and Website Developer in Kolkata, India."
  }
};

export default function HomePage() {
  return <PortfolioPage />;
}
