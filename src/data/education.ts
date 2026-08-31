import type { EducationDocument, EducationItem } from "@/types/portfolio";

export const education: EducationItem[] = [
  {
    degree: "B.Tech in Electronics Engineering",
    description:
      "Engineering degree documentation is available through the preserved B.Tech result PDF from the original portfolio.",
    documentLabel: "B.Tech Result",
    documentFileName: "B-Tech-Reasult.pdf",
    featured: true
  },
  {
    degree: "Higher Secondary Examination",
    description:
      "Higher Secondary academic result document preserved from the original portfolio.",
    documentLabel: "Higher Secondary Result",
    documentFileName: "Higher-Secondary-Examination-Reasult.pdf"
  },
  {
    degree: "Madhyamik Examination",
    description:
      "Madhyamik academic result document preserved from the original portfolio.",
    documentLabel: "Madhyamik Result",
    documentFileName: "Madhyamik-Reasult.pdf"
  }
];

export const educationDocuments: EducationDocument[] = [
  { label: "Madhyamik Result", fileName: "Madhyamik-Reasult.pdf" },
  { label: "Higher Secondary Examination Result", fileName: "Higher-Secondary-Examination-Reasult.pdf" },
  { label: "B.Tech Result", fileName: "B-Tech-Reasult.pdf" }
];
