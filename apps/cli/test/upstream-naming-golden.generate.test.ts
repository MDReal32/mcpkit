import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "vitest";
import { toCatalogToolNames } from "../src/upstream/to-catalog-tool-names";

const OUTPUT = process.env.UPSTREAM_NAMING_GOLDEN_OUTPUT ?? "";

const REGISTRY = join(__dirname, "../../../packages/servers/build/manifests");

/** The tool names each upstream server publishes, by its manifest path in the registry. */
const UPSTREAM_TOOLS: Record<string, string[]> = {
  "security/bitwarden": [
    "lock",
    "unlock",
    "sync",
    "status",
    "confirm",
    "list",
    "get",
    "generate",
    "delete",
    "restore",
    "move",
    "create_item",
    "edit_item",
    "create_folder",
    "edit_folder",
    "edit_item_collections",
    "create_attachment",
    "create_text_send",
    "create_file_send",
    "remove_send_password",
    "list_send",
    "get_send",
    "edit_send",
    "delete_send",
    "device_approval_list",
    "device_approval_approve",
    "list_org_collections",
    "get_org_collection",
    "list_org_members",
    "get_org_member_groups",
    "update_org_member_groups",
    "list_org_groups",
    "get_org_group_members",
    "list_org_policies",
    "get_org_policy",
    "get_org_events",
    "get_org_subscription",
    "update_org_subscription",
    "import_org_users_and_groups",
    "generate_username",
    "searchItems",
  ],
  "communication/teams": [
    "start_thread",
    "update_thread",
    "read_thread",
    "list_threads",
    "list_members",
    "get_member_by_name",
    "list-channels",
  ],
  "cloud/cloudflare": ["docs", "search", "execute", "whoami", "Execute"],
};

const PLAIN_NAMES = [
  "searchIssues",
  "search-issues",
  "9lives",
  "aBC",
  "__x__",
  "getHTTPResponse",
  "a1B2",
  "Ünïcode tool",
  "x",
  "x",
  "x",
  "tools",
  "",
  "---",
  "camelCaseName",
  "snake_case_name",
  "with.dots.and spaces",
];

/** `[pattern, input, template]`: what `String.prototype.replace` makes of each `$` form a naming rule may use. */
const REPLACEMENTS: [string, string, string][] = [
  ["^(a)(b)?$", "a", "$1|$2|$&"],
  ["(b)", "abc", "[$$]"],
  ["(b)", "abc", "[$&]"],
  ["(b)", "abc", "[$`]"],
  ["(b)", "abc", "[$']"],
  ["(b)", "abc", "[$10]"],
  ["(b)", "abc", "[$01]"],
  ["(b)", "abc", "[$0]"],
  ["(b)", "abc", "[$00]"],
  ["(b)", "abc", "[$2]"],
  ["(b)", "abc", "[$<x>]"],
  ["(?<x>b)", "abc", "[$<x>]"],
  ["(?<x>b)", "abc", "[$<y>]"],
  ["(?<x>b)", "abc", "[$<x]"],
  ["(b)", "abc", "[$]"],
  ["(b)", "abc", "[$$1]"],
  ["b", "abcb", "X"],
  ["(a)(b)(c)(d)(e)(f)(g)(h)(i)(j)(k)", "abcdefghijk", "$11-$10-$1-$12"],
];

/**
 * Writes `apps/server/tests/fixtures/upstream-naming.json`, which the Rust upstream naming test compares against: the
 * catalog names of each upstream manifest's tools under its naming rules, of plain names without rules, and the
 * JavaScript replacement semantics the rules rely on.
 */
it.skipIf(OUTPUT === "")("writes the upstream naming golden file", () => {
  const toolNames = Object.fromEntries(
    Object.entries(UPSTREAM_TOOLS).map(([path, names]) => {
      const manifest = JSON.parse(readFileSync(join(REGISTRY, `${path}.json`), "utf8"));
      const catalog = toCatalogToolNames(names, manifest.upstream.naming).map((entry) => entry.name);
      return [path, { names, catalog }];
    }),
  );
  const plain = { names: PLAIN_NAMES, catalog: toCatalogToolNames(PLAIN_NAMES).map((entry) => entry.name) };
  const replacements = REPLACEMENTS.map(([pattern, input, template]) => ({
    pattern,
    input,
    template,
    replaced: input.replace(new RegExp(pattern), template),
  }));
  writeFileSync(OUTPUT, `${JSON.stringify({ toolNames, plain, replacements }, null, 2)}\n`);
});
