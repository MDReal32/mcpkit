import { TOOL_ID_SEPARATOR } from './const';

const TOOL_ID_PARTS = 3;

/** `git:github:get_pull_requests` becomes server id `git:github` and tool `get_pull_requests`. */
export const parseToolId = (id: string) => {
  const parts = id.split(TOOL_ID_SEPARATOR);
  const [category, name, tool] = parts;
  if (parts.length !== TOOL_ID_PARTS || !category || !name || !tool) {
    return undefined;
  }
  return { serverId: `${category}${TOOL_ID_SEPARATOR}${name}`, tool };
};
