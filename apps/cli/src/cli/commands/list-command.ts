import type { Program } from "yargs-extended";
import { EXIT_SUCCESS } from "../const";
import { printLine } from "../output/print-line";
import { loadCatalog } from "../serve/load-catalog";
import { toAction } from "../to-action";

export const listCommand = async () => {
  const catalog = await loadCatalog([]);
  for (const server of catalog.servers) {
    printLine(`${server.id} — ${server.description ?? ""}`);
  }
  return EXIT_SUCCESS;
};

export const registerListCommand = (program: Program) => {
  program
    .command("list", "List available servers; their tools are listed when the client opens them")
    .action(toAction(listCommand));
};
