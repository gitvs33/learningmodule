export async function GET() {
  const fs = require("fs");
  const path = require("path");
  const meDir = path.join(process.cwd(), "public", "modules");
  let files = [];
  if (fs.existsSync(meDir)) {
    files = fs.readdirSync(meDir).filter((file) => file.endsWith(".html"));
  }
  return new Response(JSON.stringify({ files }), {
    headers: { "Content-Type": "application/json" },
  });
}
