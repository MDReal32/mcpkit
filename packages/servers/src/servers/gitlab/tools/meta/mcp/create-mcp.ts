import { defineTool } from '@usemcpkit/core';

export const metaMcpCreateMcp = defineTool({
  name: 'meta:mcp:create_mcp',
  description: 'Create MCP request handler. Handles Model Context Protocol requests',
  input: {
    type: 'object',
    properties: {
      jsonrpc: {
        type: 'string',
        description: 'JSON-RPC protocol version identifier. Must be `2.0`.',
        enum: ['2.0'],
      },
      method: {
        type: 'string',
        description: 'Name of the JSON-RPC method invoked on the MCP server.',
      },
      id: {
        type: 'string',
        description: 'ID of the JSON-RPC request returned in the response.',
      },
      params: {
        type: 'object',
        description: 'Parameters for the JSON-RPC method specified in `method`.',
      },
    },
    required: ['jsonrpc', 'method'],
  },
  request: {
    method: 'POST',
    path: '/mcp',
    body: ['jsonrpc', 'method', 'id', 'params'],
  },
});
