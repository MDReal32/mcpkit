import type { Env } from "@usemcpkit/core";
import { DEFAULT_REGISTRY_URL } from "@usemcpkit/servers";
import { REGISTRY_ENV } from "../const";

export const resolveRegistryUrl = (flagValue?: string, env: Env = process.env) =>
  flagValue || env[REGISTRY_ENV] || DEFAULT_REGISTRY_URL;
