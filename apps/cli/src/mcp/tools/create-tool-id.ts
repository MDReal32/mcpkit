import { TOOL_ID_SEPARATOR } from "./const";

export const createToolId = (serverId: string, tool: string) => `${serverId}${TOOL_ID_SEPARATOR}${tool}`;
