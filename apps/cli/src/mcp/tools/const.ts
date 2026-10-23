import type { MetaTool } from '../types/meta-tool';

export const LIST_SERVERS_TOOL = 'list_servers';

export const LIST_TOOLS_TOOL = 'list_tools';

export const DESCRIBE_TOOL_TOOL = 'describe_tool';

export const CALL_TOOL_TOOL = 'call_tool';

export const TOOL_ID_SEPARATOR = ':';

const SERVER_PROPERTY = {
  type: 'string',
  description: 'Server id, as returned by list_servers, for example "git:github".',
} as const;

const TOOL_ID_PROPERTY = {
  type: 'string',
  description: 'Tool id, as returned by list_tools, for example "git:github:get_pull_requests".',
} as const;

export const META_TOOLS: readonly MetaTool[] = [
  {
    name: LIST_SERVERS_TOOL,
    description: 'List the available servers as an array of ids like "git:github". Start here.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: LIST_TOOLS_TOOL,
    description: 'List the tools of one server as an array of ids like "git:github:get_pull_requests".',
    inputSchema: { type: 'object', properties: { server: SERVER_PROPERTY }, required: ['server'] },
  },
  {
    name: DESCRIBE_TOOL_TOOL,
    description: 'Describe one tool: what it does and the JSON schema of its arguments. Call it before call_tool.',
    inputSchema: { type: 'object', properties: { id: TOOL_ID_PROPERTY }, required: ['id'] },
  },
  {
    name: CALL_TOOL_TOOL,
    description: 'Run one tool with the arguments its schema asks for.',
    inputSchema: {
      type: 'object',
      properties: {
        id: TOOL_ID_PROPERTY,
        arguments: { type: 'object', description: 'Arguments matching the tool schema from describe_tool.' },
      },
      required: ['id'],
    },
  },
];
