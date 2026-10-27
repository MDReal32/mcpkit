import { isJsonObject } from "../../json";
import type { McpkitConfig } from "../types/mcpkit-config";

const isStringRecord = (value: unknown) =>
  isJsonObject(value) && Object.values(value).every((entry) => typeof entry === "string");

const isHostConfig = (value: unknown) =>
  isJsonObject(value) && (value.secrets === undefined || isStringRecord(value.secrets));

const isServerConfig = (value: unknown) =>
  isJsonObject(value) &&
  (value.domain === undefined || typeof value.domain === "string") &&
  (value.hosts === undefined || (isJsonObject(value.hosts) && Object.values(value.hosts).every(isHostConfig))) &&
  (value.projects === undefined || isStringRecord(value.projects));

export const isMcpkitConfig = (value: unknown): value is McpkitConfig =>
  isJsonObject(value) &&
  (value.servers === undefined || (isJsonObject(value.servers) && Object.values(value.servers).every(isServerConfig)));
