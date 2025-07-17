
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const meDir = path.join(process.cwd(), "public", "modules");
  let files: string[] = [];
  if (fs.existsSync(meDir)) {
    files = fs.readdirSync(meDir).filter((file) => file.endsWith(".html"));
  }
  return NextResponse.json({ files });
}

