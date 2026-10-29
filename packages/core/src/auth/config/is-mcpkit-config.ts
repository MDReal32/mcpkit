import { isJsonObject } from "../../json";
import type { McpkitConfig } from "../types/mcpkit-config";
import { CONFIG_VERSION } from "./config-migrations";

const isStringRecord = (value: unknown) =>
  isJsonObject(value) && Object.values(value).every((entry) => typeof entry === "string");

const isHostConfig = (value: unknown) =>
  isJsonObject(value) && (value.secrets === undefined || isStringRecord(value.secrets));

const isServerConfig = (value: unknown) =>
  isJsonObject(value) &&
  (value.hosts === undefined || (isJsonObject(value.hosts) && Object.values(value.hosts).every(isHostConfig))) &&
  (value.projects === undefined || isStringRecord(value.projects));

export const isMcpkitConfig = (value: unknown): value is McpkitConfig =>
  isJsonObject(value) &&
  value.version === CONFIG_VERSION &&
  (value.servers === undefined ||
    (isJsonObject(value.servers) &&
      Object.values(value.servers).every(
        (group) => isJsonObject(group) && Object.values(group).every(isServerConfig),
      )));
