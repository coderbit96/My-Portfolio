import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";
import type { SocialLink } from "@/types/portfolio";

export const socials: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/share/1GfuCcyyhp/", icon: FaFacebookF },
  { label: "GitHub", href: "https://github.com/coderbit96", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joydip-ghosh-83073033a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: FaLinkedinIn
  },
  { label: "Instagram", href: "https://www.instagram.com/ex.plorer_96?igsh=MW16NDJmOGQzaHc1Yg==", icon: FaInstagram }
];
