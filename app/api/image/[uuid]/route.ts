import { NextRequest, NextResponse } from "next/server";

const GD_BASE = "https://html5.gamedistribution.com/rvvASMiM";

const PNG_HEADER = new Uint8Array([137, 80, 78, 71]);

const CATEGORY_COLORS: Record<string, [string, string]> = {
  racing: ["#06b6d4", "#2563eb"],
  action: ["#9333ea", "#db2777"],
  sports: ["#22c55e", "#059669"],
  puzzle: ["#3b82f6", "#06b6d4"],
  arcade: ["#eab308", "#ea580c"],
  adventure: ["#7c3aed", "#7e22ce"],
  strategy: ["#d97706", "#b91c1c"],
};

function svgPlaceholder(category: string): string {
  const [c1, c2] = CATEGORY_COLORS[category.toLowerCase()] || ["#4b5563", "#1f2937"];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${c1}"/>
        <stop offset="100%" style="stop-color:${c2}"/>
      </linearGradient>
    </defs>
    <rect width="512" height="512" fill="url(#g)"/>
  </svg>`;
}

async function tryFetchPng(url: string): Promise<Uint8Array | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const buf = new Uint8Array(await res.arrayBuffer());
    if (buf.length < 8) return null;
    for (let i = 0; i < 4; i++) {
      if (buf[i] !== PNG_HEADER[i]) return null;
    }
    return buf;
  } catch {
    return null;
  }
}

const cache = new Map<string, { data: Uint8Array; type: string }>();

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params;
  if (!uuid || typeof uuid !== "string") {
    return new NextResponse(svgPlaceholder(""), {
      headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000" },
    });
  }

  const cached = cache.get(uuid);
  if (cached) {
    return new NextResponse(cached.data, {
      headers: { "Content-Type": cached.type, "Cache-Control": "public, max-age=86400" },
    });
  }

  const paths = ["icons/icon-256.png", "TemplateData/logo.png"];
  for (const path of paths) {
    const buf = await tryFetchPng(`${GD_BASE}/${uuid}/${path}`);
    if (buf) {
      cache.set(uuid, { data: buf, type: "image/png" });
      return new NextResponse(buf, {
        headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" },
      });
    }
  }

  const placeholder = svgPlaceholder("");
  return new NextResponse(placeholder, {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000" },
  });
}
