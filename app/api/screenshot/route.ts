import { NextResponse, type NextRequest } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { projects } from "@/data/projects";

export const runtime = "nodejs";
export const maxDuration = 60;

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;
const MAX_DIMENSION = 2000;

// Deploy URLs only — an allowlist, not an open proxy. Anything not
// configured on a project in data/projects.ts is rejected before a browser
// is ever launched, so this route can't be abused to screenshot arbitrary
// (including internal/private) URLs.
function isAllowedUrl(url: string): boolean {
  return projects.some((project) => project.url === url);
}

function clampDimension(value: string | null, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.min(Math.round(parsed), MAX_DIMENSION);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url || !isAllowedUrl(url)) {
    return NextResponse.json(
      { error: "url must match a project's deploy URL in data/projects.ts" },
      { status: 403 },
    );
  }

  const width = clampDimension(searchParams.get("width"), DEFAULT_WIDTH);
  const height = clampDimension(searchParams.get("height"), DEFAULT_HEIGHT);

  const browser = await puppeteer.launch({
    args: await puppeteer.defaultArgs({
      args: chromium.args,
      headless: "shell",
    }),
    defaultViewport: { width, height },
    executablePath: await chromium.executablePath(),
    headless: "shell",
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });
    const screenshot = await page.screenshot({ type: "png" });

    return new NextResponse(Buffer.from(screenshot), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control":
          "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to capture a screenshot of the requested URL" },
      { status: 502 },
    );
  } finally {
    await browser.close();
  }
}
