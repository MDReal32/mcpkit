import { isJsonObject } from "../../json";
import type { McpkitConfig } from "../types/mcpkit-config";

const isSecretsRecord = (value: unknown) =>
  isJsonObject(value) && Object.values(value).every((entry) => typeof entry === "string");

const isServerConfig = (value: unknown) =>
  isJsonObject(value) &&
  (value.domain === undefined || typeof value.domain === "string") &&
  (value.secrets === undefined || isSecretsRecord(value.secrets));

export const isMcpkitConfig = (value: unknown): value is McpkitConfig =>
  isJsonObject(value) &&
  (value.servers === undefined || (isJsonObject(value.servers) && Object.values(value.servers).every(isServerConfig)));
