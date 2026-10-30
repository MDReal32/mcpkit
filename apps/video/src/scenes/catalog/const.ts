import type { ServerTileData } from "./server-tile-data";

/** Tool counts as generated in packages/servers; Bitwarden's are discovered from its upstream server. */
export const SERVER_TILES: readonly ServerTileData[] = [
  {
    category: "git",
    name: "GitHub",
    tools: 1300,
    examples: [
      "repos:repos:list_branches",
      "issues:pulls:create",
      "actions:actions:get_workflow",
      "issues:issues:list_events",
      "orgs:orgs:list_org_roles",
      "repos:checks:list_annotations",
      "users:search:commits",
      "repos:repos:delete_webhook",
    ],
  },
  {
    category: "git",
    name: "GitLab",
    tools: 1857,
    examples: [
      "groups:groups:list_groups",
      "ci:ci_jobs:get_job",
      "admin:geo:create_geo_sites",
      "projects:keys:get_users_keys",
      "ci:rollouts:create_rollouts",
      "ci:jobs:update_jobs",
      "admin:geo:delete_geo_nodes",
      "ci:ci_runners:delete_runners",
    ],
  },
  {
    category: "atlassian",
    name: "Jira",
    tools: 758,
    examples: [
      "issues:issues:do_transition",
      "software:board:get_epics",
      "software:sprint:get_sprint",
      "issues:issues:assign_issue",
      "projects:projects:get_project",
      "users:user_search:find_users",
      "issues:issues:get_transitions",
      "collaboration:plans:get_plans",
    ],
  },
  {
    category: "atlassian",
    name: "Confluence",
    tools: 623,
    examples: [
      "cloud:pages:create_page",
      "cloud:pages:get_child_pages",
      "datacenter:space:get_content",
      "cloud_v1:search:search_by_cql",
      "cloud:tasks:get_tasks",
      "cloud_v1:user:get_user",
      "datacenter:label:get_recent",
      "cloud:embeds:create_smart_link",
    ],
  },
  {
    category: "productivity",
    name: "ClickUp",
    tools: 209,
    examples: [
      "tasks:tasks:create_task",
      "tasks:tasks:get_tasks",
      "hierarchy:views:get_view_tasks",
      "docs:docs:search_for_docs",
      "goals:goals:get_goals",
      "hierarchy:views:update_view",
      "hierarchy:lists:delete_list",
      "admin:webhooks:get_webhooks",
    ],
  },
  {
    category: "communication",
    name: "Discord",
    tools: 324,
    examples: [
      "channels:threads:create_thread",
      "channels:polls:poll_expire",
      "guilds:roles:list_guild_roles",
      "channels:messages:create_pin",
      "users:guilds:list_my_guilds",
      "global:gateway:get_gateway",
      "guilds:roles:delete_guild_role",
      "global:stickers:get_sticker",
    ],
  },
  {
    category: "security",
    name: "Bitwarden",
    tools: 59,
    examples: [
      "vault:items:generate",
      "vault:items:list",
      "session:session:unlock",
      "vault:folders:create",
      "send:sends:create_text",
      "org:members:list",
      "vault:items:get",
      "session:session:sync",
    ],
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

export const EXAMPLE_SECONDS = 0.55;

export const EXAMPLE_ROLL_SECONDS = 0.2;

/** How far each card's roll is shifted from the previous card's, so they do not tick in step. */
export const EXAMPLE_STAGGER = 0.13;

export const ALPHA_AT = 2.3;
