import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

export const revalidate = 300;

interface GitHubStarredRepo {
  name: string;
  full_name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

const githubUsername = siteConfig.github.split("/").filter(Boolean).pop() ?? "";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/starred?per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate }
      }
    );

    if (!response.ok) {
      return NextResponse.json({ repositories: [] }, { status: 200 });
    }

    const repos = (await response.json()) as GitHubStarredRepo[];

    const repositories = repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        homepage: repo.homepage,
        githubUrl: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count
      }));

    return NextResponse.json(
      { repositories },
      { headers: { "Cache-Control": `public, max-age=0, s-maxage=${revalidate}, stale-while-revalidate=60` } }
    );
  } catch {
    return NextResponse.json({ repositories: [] }, { status: 200 });
  }
}
