import fs from "fs";
import path from "path";

export async function GET() {
  const meDir = path.join(process.cwd(), "public", "modules");
  let files = [];
  if (fs.existsSync(meDir)) {
    files = fs.readdirSync(meDir).filter((file) => file.endsWith(".html"));
  }
  return new Response(JSON.stringify(files), {
    headers: { "Content-Type": "application/json" },
  });
}
