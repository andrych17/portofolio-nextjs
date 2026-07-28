@RTK.md
# graphify
- **graphify** (~/.claude/skills/graphify/SKILL.md) - any input to knowledge graph. Trigger: /graphify`r
When the user types /graphify, invoke the Skill tool with `skill: "graphify"` before doing anything else.




## ??? Aturan Keamanan (Safety Rules)
- **DILARANG KERAS** menjalankan git commit secara otomatis.
- **DILARANG KERAS** menjalankan git push --force atau git push -f. Semua proses commit dan push harus diserahkan kepada pengguna secara manual.

## graphify

STRICT REQUIREMENT: NEVER use `grep` or `grep_search` tool as first search method for codebase/architecture questions. ALWAYS use graphify first.

Rules:
- BEFORE searching code: Check if `graphify-out/graph.json` exists. If missing, run `graphify index .` immediately to build graph.
- For all codebase/architecture questions, MUST run `graphify query "<question>"` (CLI) or `query_graph` (MCP) first. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts.
- `grep` / `grep_search` is STRICTLY prohibited unless graphify tools yield no results or fail.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
