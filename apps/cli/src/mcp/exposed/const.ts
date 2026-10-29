import { SERVER_NAME } from "../const";

/** The API refuses tool names over 64 characters, and the client puts `mcp__<server>__` in front of ours. */
const MAX_CLIENT_TOOL_NAME_LENGTH = 64;
const CLIENT_TOOL_PREFIX = `mcp__${SERVER_NAME}__`;

export const MAX_TOOL_NAME_LENGTH = MAX_CLIENT_TOOL_NAME_LENGTH - CLIENT_TOOL_PREFIX.length;

export const NAME_PART_SEPARATOR = "_";

export const HASH_LENGTH = 6;

export const EMPTY_INPUT_SCHEMA = { type: "object", properties: {} } as const;
