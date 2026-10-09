// Content for /play. Mirrors public/llms-full.txt; keep both in sync when the CV changes.

export const SINCE = new Date("2019-09-01T00:00:00+07:00");

export const MENU = [
  { id: "profile", label: "Profile", hint: "Surabaya · shipping since 2019" },
  { id: "career", label: "Career", hint: "3 companies · 2019 to 2026" },
  { id: "works", label: "Works", hint: "4 builds that are live or ran in prod" },
  { id: "skills", label: "Skills", hint: "backend · frontend · AI · ops" },
  { id: "contact", label: "Contact", hint: "email · WhatsApp · CV" },
] as const;

export type SectionId = (typeof MENU)[number]["id"];

export const PROFILE = {
  name: ["Andry", "Huang"],
  role: "Senior Full-Stack Developer & AI Systems",
  bio: "I build the systems a business runs on: SaaS for a Singapore mall operator, ERPs for shops that count gold by the gram, and an AI recruitment platform I founded. .NET and Next.js by day, MCP servers and agents by night.",
  stats: [
    ["Base", "Surabaya, Indonesia"],
    ["Since", "September 2019"],
    ["Mode", "Remote · contract or full-time"],
    ["Speaks", "Indonesian, English"],
    ["Guild", "Qualiv · Founder"],
  ],
  achievements: [
    "MCP: Advanced Topics · Anthropic",
    "Introduction to MCP · Anthropic",
    "Introduction to Subagents · Anthropic",
    "Introduction to Agent Skills · Anthropic",
    "AI Capabilities and Limitations · Anthropic",
    "Building with the Claude API · Anthropic",
    "Claude Code in Action · Anthropic",
    "AI Agents with MCP · Vanderbilt University",
  ],
};

export const CAREER = [
  {
    company: "MRI Software",
    note: "formerly Anacle Systems",
    place: "Singapore · remote",
    role: "Fullstack Developer",
    from: [2022, 11],
    to: [2026, 3],
    dates: "Nov 2022 – Mar 2026",
    points: [
      "Shipped the SMRT mall tenant system: lease contracts, tenders and tenant ops moved off paper, on Next.js and .NET Core.",
      "Built a migration service that moved 100,000+ files into SharePoint, S3 and Azure Blob with RBAC and audit logs.",
      "Features and fixes on Simplicity, an enterprise facilities SaaS (.NET Core 8, SQL Server, microservices).",
      "Kept SonarQube gates at zero vulnerabilities while paying down legacy code smells.",
    ],
  },
  {
    company: "Software House",
    note: "",
    place: "Surabaya",
    role: "Fullstack Developer",
    from: [2022, 3],
    to: [2022, 11],
    dates: "Mar 2022 – Nov 2022",
    points: [
      "Led the Java 17 / Spring Boot upgrade of a Tool Management System and reviewed the team's code.",
      "Repaired 10,000+ records corrupted by a legacy race condition.",
      "Ran the self-hosted Git server and the Elasticsearch log cluster.",
    ],
  },
  {
    company: "Tjiwi Kimia",
    note: "APP Sinar Mas",
    place: "East Java",
    role: "Full-Stack Developer",
    from: [2019, 9],
    to: [2022, 2],
    dates: "Sep 2019 – Feb 2022",
    points: [
      "Built dozens of plant dashboards and reports for pulp and paper operations (.NET Core, ASP Classic, SQL Server).",
      "Wrote a WhatsApp bot that pushed live machine OEE numbers to management every shift.",
      "Made a native Android barcode app for warehouse check-in and check-out.",
    ],
  },
] as const;

export const WORKS = [
  {
    name: "Qualiv",
    role: "Founder · lead architect",
    url: "https://qualiv.id",
    img: "/projects/qualiv_01_landing_hero_en.png",
    line: "Multi-tenant AI recruitment SaaS, built from an empty repo.",
    parts: ["CV parsing for PDF and DOCX", "LLM logic tests", "AI interview simulation, chat and video", "BullMQ workers", "Midtrans billing"],
    stack: ["Next.js 16", "NestJS", "PostgreSQL", "Prisma", "Redis", "GPT-4o"],
  },
  {
    name: "Wonderful Works",
    role: "Web platform · visual CMS",
    url: "https://wwconstruction.id",
    img: "/projects/wwconstruction_01_landing_hero_en.png",
    line: "Site and page composer for an architecture and contracting firm.",
    parts: ["Puck visual page composer", "Section layout engine", "ID / EN content sync", "Zero-flash preloader"],
    stack: ["Next.js 16", "React", "Tailwind", "PostgreSQL", "Docker"],
  },
  {
    name: "OpenClaw",
    role: "Autonomous ops agent",
    url: "",
    img: "/projects/openclaw_01_telegram_ops_alerts_en.png",
    line: "A watchdog that reads a VPS's logs, bans attackers, and reports on Telegram.",
    parts: ["Syslog and auth anomaly detection with GPT-4o", "fail2ban against SSH brute force", "CPU / RAM / disk thresholds", "Telegram incident reports"],
    stack: ["Node.js", "OpenAI", "fail2ban", "Bash", "Docker"],
  },
  {
    name: "Retail ERP & POS",
    role: "Gold, tires, yarn",
    url: "",
    img: "/projects/jewel_02_gold_diamond_rfid_inventory_en.png",
    line: "Vertical ERPs for shops with very specific stock problems.",
    parts: ["RFID jewelry audit: 2 hours down to 3 minutes", "Multi-warehouse tire ERP with AR / AP", "Yarn dye-lot tracking for a textile retailer"],
    stack: ["Laravel 11", "Livewire 3", "MySQL 8", "RFID serial bridge"],
  },
] as const;

export const SKILLS = [
  {
    name: "Backend",
    items: [".NET Core 8/9 · C#", "ASP.NET Core Web API", "EF Core · Dapper", "NestJS · Express", "Java 17 · Spring Boot", "FastAPI", "PostgreSQL · pgvector", "SQL Server · T-SQL", "Redis · BullMQ"],
  },
  {
    name: "Frontend",
    items: ["Next.js 16 · App Router", "React 19", "TypeScript strict", "Tailwind CSS v4", "Framer Motion", "three.js", "WCAG 2.1 AA"],
  },
  {
    name: "AI Systems",
    items: ["MCP servers & tools", "Agent workflows", "Claude API · Claude Code", "OpenAI GPT-4o", "Gemini SDK", "RAG · hybrid search", "Structured outputs"],
  },
  {
    name: "Ops",
    items: ["Docker · Compose", "Linux · Nginx", "Cloudflare · R2", "AWS S3 · Azure Blob", "GitHub Actions · GitLab CI", "SonarQube", "Playwright · Selenium"],
  },
] as const;

export const CONTACT = [
  { label: "Email", value: "andrych17@gmail.com", href: "mailto:andrych17@gmail.com" },
  { label: "WhatsApp", value: "+62 813 5729 6386", href: "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I%20found%20you%20through%20%2Fplay" },
  { label: "GitHub", value: "andrych17", href: "https://github.com/andrych17" },
  { label: "LinkedIn", value: "andry-huang", href: "https://linkedin.com/in/andry-huang-ba410a170" },
  { label: "CV", value: "PDF, 1 page", href: "/Andry_Huang_CV.pdf" },
] as const;
