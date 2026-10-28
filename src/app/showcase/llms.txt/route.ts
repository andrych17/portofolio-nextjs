import { sectors, templatePath, templatesOf } from "@/lib/registry";
import { absoluteUrl } from "@/lib/site";

// Plain-text summary for LLM crawlers. Only uses copy that already appears on the pages.
export function GET() {
  const blocks = sectors.map((s) => {
    const items = templatesOf(s.slug)
      .map((t) => `- [${t.name}](${absoluteUrl(templatePath(t))}): ${t.description} Motion: ${t.motion.join(", ")}.`)
      .join("\n");
    return `## ${s.name}\n\n${s.description}\n\n${items || "- Coming soon."}`;
  });
  const body = `# Website Templates by Andry Huang\n\n> Animated, mobile-first Next.js website templates grouped by sector. Each demo uses the placeholder brand "Your Brand". Demo content is fictional. Templates are customised and deployed by Andry Huang, https://andryhuang.com.\n\nSector pages: ${absoluteUrl("/")}\n\n${blocks.join("\n\n")}\n`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
