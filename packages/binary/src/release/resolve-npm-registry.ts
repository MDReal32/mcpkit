import type { Env } from "@usemcpkit/core";
import { DEFAULT_NPM_REGISTRY, NPM_REGISTRY_ENV } from "../const";

export const resolveNpmRegistry = (env: Env) => (env[NPM_REGISTRY_ENV] ?? DEFAULT_NPM_REGISTRY).replace(/\/+$/, "");
