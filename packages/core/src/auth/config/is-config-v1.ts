import { isJsonObject } from "../../json";
import type { ConfigV1 } from "../types/config-v1";
import { isMcpkitConfig } from "./is-mcpkit-config";

const isServerV1 = (value: unknown) => {
  if (!isJsonObject(value)) {
    return false;
  }
  const { secrets, ...rest } = value;
  const secretsValid =
    secrets === undefined ||
    (isJsonObject(secrets) && Object.values(secrets).every((entry) => typeof entry === "string"));
  return secretsValid && isMcpkitConfig({ version: 2, servers: { server: rest } });
};

export const isConfigV1 = (value: unknown): value is ConfigV1 =>
  isJsonObject(value) &&
  (value.servers === undefined || (isJsonObject(value.servers) && Object.values(value.servers).every(isServerV1)));
