import { join } from "node:path";
import type { Env, Manifest } from "@usemcpkit/core";
import { resolveHomeDir } from "@usemcpkit/core";
import { REPOS_DIR_NAME } from "./const";

/** `~/.mcpkit/repos/<category>/<name>`: where the repository of one upstream server is cloned. */
export const resolveRepoDir = ({ category, name }: Pick<Manifest, "category" | "name">, env: Env = process.env) =>
  join(resolveHomeDir(env), REPOS_DIR_NAME, category, name);
