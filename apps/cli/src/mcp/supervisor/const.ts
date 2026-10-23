export const WORKER_FLAG = '--worker';

export const BINARY_POLL_INTERVAL_MS = 3000;

export const HANDSHAKE_TIMEOUT_MS = 15_000;

export const RETIRED_WORKER_GRACE_MS = 5 * 60_000;

export const HANDSHAKE_REQUEST_ID = 'mcpkit-reload';

export const INITIALIZE_METHOD = 'initialize';

export const INITIALIZED_METHOD = 'notifications/initialized';

export const TOOLS_LIST_CHANGED = { jsonrpc: '2.0', method: 'notifications/tools/list_changed' } as const;

export const SYNTHETIC_INITIALIZE = JSON.stringify({
  jsonrpc: '2.0',
  id: HANDSHAKE_REQUEST_ID,
  method: INITIALIZE_METHOD,
  params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'mcpkit-supervisor', version: '0' } },
});
