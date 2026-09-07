import type { Metadata } from "next";
import PortfolioPage from "@/components/layout/PortfolioPage";

export const metadata: Metadata = {
  title: {
    absolute: "Joydip Ghosh | Full Stack Developer in Kolkata, India"
  },
  description:
    "Joydip Ghosh is a Full Stack Developer in Kolkata, India, building AI-enabled web applications with React, Next.js, TypeScript, Node.js and MongoDB.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Joydip Ghosh | Full Stack Developer in Kolkata, India",
    description:
      "Portfolio of Joydip Ghosh, a Full Stack Developer in Kolkata building AI-enabled applications with React, Next.js and the MERN stack.",
    url: "/",
    type: "profile"
  },
  twitter: {
    card: "summary_large_image",
    title: "Joydip Ghosh | Full Stack Developer in Kolkata, India",
    description: "Full Stack Developer building AI-enabled web applications with React, Next.js and the MERN stack."
  }
};

export default function HomePage() {
  return <PortfolioPage />;
}
