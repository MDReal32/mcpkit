import { TOOL_ID_SEPARATOR } from './const';

const SERVER_ID_PARTS = 2;

/** `git:github:pull_request:list` becomes server id `git:github` and tool `pull_request:list`. */
export const parseToolId = (id: string) => {
  const parts = id.split(TOOL_ID_SEPARATOR);
  const [category, name] = parts;
  const tool = parts.slice(SERVER_ID_PARTS).join(TOOL_ID_SEPARATOR);
  if (!category || !name || !tool || parts.slice(SERVER_ID_PARTS).some((part) => part === '')) {
    return undefined;
  }
  return { serverId: `${category}${TOOL_ID_SEPARATOR}${name}`, tool };
};
