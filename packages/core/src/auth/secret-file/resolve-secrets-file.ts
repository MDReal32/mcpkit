import { join } from "node:path";
import type { Env } from "../../env";
import { resolveHomeDir } from "../../home";
import { SECRETS_FILE_NAME } from "../const";

export const resolveSecretsFile = (env: Env) => join(resolveHomeDir(env), SECRETS_FILE_NAME);
