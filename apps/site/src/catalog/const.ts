import type { ServerPresentation } from "./types";

/** How the page names and describes the servers it knows; a server the registry adds later falls back to its own id and description. */
export const SERVER_PRESENTATIONS: Readonly<Record<string, ServerPresentation>> = {
  "security:bitwarden": { name: "Bitwarden", tagline: "Vault items, passwords and one-time codes." },
  "productivity:clickup": { name: "ClickUp", tagline: "Tasks, docs, goals and time tracking." },
  "cloud:cloudflare": { name: "Cloudflare", tagline: "Workers, databases, storage, DNS and more." },
  "atlassian:confluence": { name: "Confluence", tagline: "Pages, spaces and search, on Cloud or Data Center." },
  "communication:discord": { name: "Discord", tagline: "Messages, channels, roles and moderation as a bot." },
  "design:figma": { name: "Figma", tagline: "Files, nodes, comments, components and variables." },
  "git:github": { name: "GitHub", tagline: "Repositories, issues, pull requests, Actions and security." },
  "git:gitlab": { name: "GitLab", tagline: "Projects, merge requests, CI/CD and packages." },
  "atlassian:jira": { name: "Jira", tagline: "Issues, boards, sprints and workflows." },
  "communication:medium": { name: "Medium", tagline: "Publish posts to your profile or a publication." },
  "automation:n8n": { name: "n8n", tagline: "Workflows, runs, credentials and projects." },
  "automation:n8n_mcp": { name: "n8n MCP", tagline: "The tools built into your n8n instance." },
  "api:postman": { name: "Postman", tagline: "Collections, environments, mocks and monitors." },
  "communication:reddit": { name: "Reddit", tagline: "Read subreddits, posts, comments and profiles." },
  "communication:teams": { name: "Microsoft Teams", tagline: "Start and read threads in a team channel." },
};

export const MAX_TAGLINE_LENGTH = 110;
