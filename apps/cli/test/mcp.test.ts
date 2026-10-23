import { PassThrough } from 'node:stream';
import { createFakeFetch, createPingManifest } from '@usemcpkit/testing';
import { describe, expect, it } from 'vitest';
import { createRpcHandler, serveStdio } from '../src/mcp';

const manifests = new Map([['demo', createPingManifest('1.0.0')]]);
const handle = createRpcHandler(manifests, { fetchImpl: createFakeFetch(200, { pong: true }) });

describe('createRpcHandler', () => {
  it('answers initialize with the client protocol version', async () => {
    const response = await handle({ id: 1, method: 'initialize', params: { protocolVersion: '2025-03-26' } });

    expect(response?.result).toMatchObject({
      protocolVersion: '2025-03-26',
      capabilities: { tools: { listChanged: true } },
    });
  });

  it('lists namespaced tools', async () => {
    const response = await handle({ id: 2, method: 'tools/list' });

    expect(response?.result).toEqual({
      tools: [{ name: 'demo_ping', description: '[demo] Ping', inputSchema: { type: 'object', properties: {} } }],
    });
  });

  it('calls a tool and returns JSON text content', async () => {
    const response = await handle({ id: 3, method: 'tools/call', params: { name: 'demo_ping', arguments: {} } });

    expect(response?.result).toEqual({ content: [{ type: 'text', text: '{\n  "pong": true\n}' }] });
  });

  it('reports tool failures as isError results', async () => {
    const failing = createRpcHandler(manifests, { fetchImpl: createFakeFetch(500, 'boom') });

    const response = await failing({ id: 4, method: 'tools/call', params: { name: 'demo_ping' } });

    expect(response?.result).toEqual({ content: [{ type: 'text', text: 'demo API 500: boom' }], isError: true });
  });

  it('returns protocol errors for unknown tools, bad arguments and unknown methods', async () => {
    expect((await handle({ id: 5, method: 'tools/call', params: { name: 'nope' } }))?.error?.code).toBe(-32602);
    expect(
      (await handle({ id: 6, method: 'tools/call', params: { name: 'demo_ping', arguments: [] } }))?.error?.code,
    ).toBe(-32602);
    expect((await handle({ id: 7, method: 'nope' }))?.error?.code).toBe(-32601);
  });

  it('returns nothing for notifications', async () => {
    expect(await handle({ method: 'notifications/initialized' })).toBeNull();
  });
});

describe('serveStdio', () => {
  it('answers parse and invalid request errors with a null id', async () => {
    const input = new PassThrough();
    const output = new PassThrough();
    const chunks: string[] = [];
    output.on('data', (chunk: Buffer) => chunks.push(chunk.toString()));

    const serving = serveStdio(manifests, { input, output });
    input.end('garbage\n{"id":1}\n');
    await serving;
    await new Promise((resolve) => setImmediate(resolve));

    const responses: unknown = chunks
      .join('')
      .trim()
      .split('\n')
      .map((line) => JSON.parse(line));
    expect(responses).toEqual([
      { jsonrpc: '2.0', id: null, error: { code: -32700, message: expect.stringMatching(/^parse error/) } },
      { jsonrpc: '2.0', id: null, error: { code: -32600, message: expect.stringMatching(/^invalid request/) } },
    ]);
  });
});
