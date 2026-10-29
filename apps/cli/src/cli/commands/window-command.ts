import type { Program } from "yargs-extended";
import { EXIT_SUCCESS } from "../const";
import { toAction } from "../to-action";
import type { WindowOptions } from "../types/window-options";
import { runFormWindow } from "../window/run-form-window";

export const windowCommand = async (options: WindowOptions) => {
  await runFormWindow(options.url);
  return EXIT_SUCCESS;
};

export const registerWindowCommand = (program: Program) => {
  program
    .command("window", "Internal: show a credentials form URL in a native window")
    .positional("<url: string>", { description: "The loopback URL of the form" })
    .action(toAction(windowCommand));
};
