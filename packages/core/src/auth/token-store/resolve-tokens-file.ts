import { join } from "node:path";
import type { Env } from "../../env";
import { resolveHomeDir } from "../../home";
import { TOKENS_FILE_NAME } from "../const";

export const resolveTokensFile = (env: Env) => join(resolveHomeDir(env), TOKENS_FILE_NAME);
