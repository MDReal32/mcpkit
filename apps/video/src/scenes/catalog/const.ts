import type { ServerTileData } from "./server-tile-data";

/** Tool counts as generated in packages/servers; Bitwarden's are discovered from its upstream server. */
export const SERVER_TILES: readonly ServerTileData[] = [
  {
    category: "git",
    name: "GitHub",
    tools: 1300,
    examples: ["repos:repos:list_branches", "issues:pulls:create", "actions:actions:get_artifact"],
  },
  {
    category: "git",
    name: "GitLab",
    tools: 1857,
    examples: ["projects:projects:list_projects", "issues:labels:get_groups_labels", "ci:ci_lint:get_projects_ci_lint"],
  },
  {
    category: "atlassian",
    name: "Jira",
    tools: 758,
    examples: ["issues:issue_search:count_issues", "issues:issues:do_transition", "software:board:get_epics"],
  },
  {
    category: "atlassian",
    name: "Confluence",
    tools: 623,
    examples: ["cloud:pages:create_page", "cloud:pages:get_child_pages", "datacenter:space:get_content"],
  },
  {
    category: "productivity",
    name: "ClickUp",
    tools: 209,
    examples: ["tasks:tasks:create_task", "tasks:tasks:get_tasks", "hierarchy:views:get_view_tasks"],
  },
  {
    category: "communication",
    name: "Discord",
    tools: 324,
    examples: ["channels:messages:create_message", "channels:threads:create_thread", "channels:polls:poll_expire"],
  },
  {
    category: "security",
    name: "Bitwarden",
    tools: 59,
    examples: ["vault:items:generate", "vault:items:list", "session:session:unlock"],
  },
];

export const TILES_AT = 0.25;

export const TILE_STEP = 0.07;

export const COUNT_SECONDS = 1.7;

export const TILE_WIDTH = 380;

export const TILE_GAP = 26;

export const TILE_ROWS: readonly (readonly number[])[] = [
  [0, 1, 2, 3],
  [4, 5, 6],
];

export const EXAMPLE_SECONDS = 0.75;

export const EXAMPLE_ROLL_SECONDS = 0.22;
