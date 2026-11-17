import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { linkServeScript } from "./link-serve-script.ts";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const link = await linkServeScript(workspaceRoot);
process.stdout.write(`${link} starts "usemcpkit serve" in the dev home; use it as the command of a client\n`);
