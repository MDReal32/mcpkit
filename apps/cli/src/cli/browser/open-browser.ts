import { spawn } from "node:child_process";
import { describeError } from "@usemcpkit/core";
import { printError } from "../output/print-error";
import { resolveBrowserCommand } from "./resolve-browser-command";

/** Best effort: the URL is printed first, so a missing opener only costs a manual copy. */
export const openBrowser = (url: string) => {
  const { command, args } = resolveBrowserCommand(process.platform, url);
  const child = spawn(command, args, { stdio: "ignore", detached: true });
  child.on("error", (error) => {
    printError(`could not open a browser (${describeError(error)}), open the URL above manually`);
  });
  child.unref();
};
