import type { UsageEvent } from "../types/usage-event";
import { MAX_TOOL_LENGTH, OS_NAMES, TOOL_ID_PATTERN, VERSION_PATTERN } from "./const";

export const parseUsageEvent = (value: unknown) => {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }
  const { tool, version, os } = value as Record<string, unknown>;
  if (typeof tool !== "string" || tool.length > MAX_TOOL_LENGTH || !TOOL_ID_PATTERN.test(tool)) {
    return undefined;
  }
  if (typeof version !== "string" || !VERSION_PATTERN.test(version)) {
    return undefined;
  }
  if (typeof os !== "string" || !OS_NAMES.includes(os)) {
    return undefined;
  }
  const event: UsageEvent = { tool, version, os };
  return event;
};
