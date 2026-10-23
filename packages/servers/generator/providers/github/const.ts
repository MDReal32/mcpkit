export const SPEC_URL =
  "https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/dereferenced/api.github.com.2022-11-28.deref.json";

export const SERVER_GROUPS = [
  {
    name: "repos",
    categories: [
      "repos",
      "branches",
      "collaborators",
      "commits",
      "deploy-keys",
      "deployments",
      "git",
      "pages",
      "releases",
      "metrics",
      "checks",
      "code-quality",
    ],
  },
  {
    name: "issues",
    categories: ["issues", "pulls", "reactions", "projects"],
  },
  {
    name: "actions",
    categories: ["actions"],
  },
  {
    name: "security",
    categories: [
      "security-advisories",
      "code-scanning",
      "code-security",
      "secret-scanning",
      "dependabot",
      "dependency-graph",
      "credentials",
      "private-registries",
    ],
  },
  {
    name: "orgs",
    categories: ["orgs", "teams", "billing", "interactions", "migrations", "campaigns", "classroom"],
  },
  {
    name: "users",
    categories: ["users", "activity", "gists", "search"],
  },
  {
    name: "apps",
    categories: ["apps", "packages", "codespaces"],
  },
  {
    name: "copilot",
    categories: ["copilot", "copilot-spaces", "agents", "agent-automations", "agent-tasks"],
  },
  {
    name: "meta",
    categories: ["meta", "rate-limit", "emojis", "gitignore", "licenses", "markdown", "codes-of-conduct"],
  },
];

export const SERVER_NAME = "github";

export const SERVER_DESCRIPTION =
  "GitHub REST API: repositories, issues and pull requests, Actions, security, organizations, users, apps, Copilot and meta endpoints. Tools are named '<group>:<resource>:<action>'.";
