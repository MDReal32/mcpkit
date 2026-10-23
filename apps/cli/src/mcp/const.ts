export const DEFAULT_PROTOCOL_VERSION = '2025-06-18';

export const SERVER_NAME = 'mcpkit';

export const RPC_ERROR_CODES = {
  parseError: -32700,
  invalidRequest: -32600,
  methodNotFound: -32601,
  invalidParams: -32602,
  internalError: -32603,
} as const;
