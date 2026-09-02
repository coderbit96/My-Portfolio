import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";
import type { SocialLink } from "@/types/portfolio";

export const socials: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/share/1DSUQ3Mw93/", icon: FaFacebookF },
  { label: "GitHub", href: "https://github.com/coderbit96", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joydip-ghosh-83073033a/",
    icon: FaLinkedinIn
  },
  { label: "Instagram", href: "https://www.instagram.com/joydip.69?igsi=MW16NDJmOGQzaHc1Yg==", icon: FaInstagram }
];
