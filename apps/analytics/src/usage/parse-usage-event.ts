import type { UsageEvent } from "../types";
import { MAX_TOOL_LENGTH, TOOL_ID_PATTERN } from "./const";

/** Reads the tool id only: older CLIs also send a version and an OS, which are neither kept nor checked. */
export const parseUsageEvent = (value: unknown) => {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }
  const { tool } = value as Record<string, unknown>;
  if (typeof tool !== "string" || tool.length > MAX_TOOL_LENGTH || !TOOL_ID_PATTERN.test(tool)) {
    return undefined;
  }
  const event: UsageEvent = { tool };
  return event;
};
