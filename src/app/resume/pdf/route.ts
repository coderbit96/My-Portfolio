import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const resumeFileName = "Joydip-Ghosh-Resume.pdf";

export async function GET() {
  const resumePath = path.join(process.cwd(), "public", "resume", resumeFileName);
  const resume = await readFile(resumePath);

  return new NextResponse(new Uint8Array(resume), {
    headers: {
      "Cache-Control": "public, max-age=3600, must-revalidate",
      "Content-Disposition": `inline; filename="${resumeFileName}"`,
      "Content-Type": "application/pdf"
    }
  });
}
