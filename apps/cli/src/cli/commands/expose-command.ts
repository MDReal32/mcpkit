import { loadExposedTools, saveExposedTools } from "@usemcpkit/core";
import type { Program } from "yargs-extended";
import { listExposedTools } from "../../mcp";
import { EXIT_SUCCESS } from "../const";
import { printLine } from "../output/print-line";
import { loadCatalog } from "../serve/load-catalog";
import { toAction } from "../to-action";
import type { ExposeOptions } from "../types/expose-options";

const nextPatterns = (current: readonly string[], requested: readonly string[], remove: boolean) =>
  remove
    ? current.filter((pattern) => !requested.includes(pattern))
    : [...current, ...requested.filter((pattern) => !current.includes(pattern))];

const printExposure = async (patterns: readonly string[]) => {
  const { tools, skipped } = listExposedTools(await loadCatalog([]), patterns);
  printLine(`${tools.length} tool(s) exposed`);
  for (const tool of tools) {
    printLine(`  ${tool.name}  (${tool.id})`);
  }
  for (const reason of skipped) {
    printLine(`  skipped ${reason}`);
  }
};

export const exposeCommand = async ({ patterns = [], remove }: ExposeOptions) => {
  const current = await loadExposedTools(process.env);
  const updated = nextPatterns(current, patterns, remove);
  if (patterns.length > 0) {
    await saveExposedTools(process.env, updated);
  }
  printLine(updated.length === 0 ? "no patterns" : `patterns: ${updated.join(", ")}`);
  await printExposure(updated);
  return EXIT_SUCCESS;
};

export const registerExposeCommand = (program: Program) => {
  program
    .command("expose", "List tools as MCP tools of their own, so the AI client can allow or block each one")
    .positional("...[patterns: string[]]", {
      description: "Tool ids or their leading part, for example jira:issues or atlassian:jira:issues:get_issue",
    })
    .option("--remove", { description: "Stop exposing the given patterns", default: false })
    .action(toAction(exposeCommand));
};
