import { createFakeFetch } from '@mcpkit/testing';
import { describe, expect, it } from 'vitest';
import { buildRequest, executeTool, prepareToolArgs, ToolError } from '../src/main';
import { createItemTool, DEMO_ENV, demoManifest, listItemsTool } from './fixtures/demo-manifest';

const BEARER_AUTH = { headers: { Authorization: 'Bearer secret' }, query: {} };

describe('buildRequest', () => {
  it('builds a GET request with path params, renamed query args, defaults and auth', () => {
    const request = buildRequest(
      demoManifest,
      listItemsTool,
      prepareToolArgs(listItemsTool, { owner: 'a b', page: 2 }),
      BEARER_AUTH,
    );

    expect(request.method).toBe('GET');
    expect(request.url).toBe('https://api.example.com/owners/a%20b/items?s=open&page=2');
    expect(request.headers).toEqual({ Accept: 'application/json', Authorization: 'Bearer secret' });
    expect(request.body).toBeUndefined();
  });

  it('builds a JSON body for POST', () => {
    const request = buildRequest(demoManifest, createItemTool, { owner: 'o', title: 'hi' }, BEARER_AUTH);

    expect(request.body).toBe('{"title":"hi"}');
    expect(request.headers['Content-Type']).toBe('application/json');
  });

  it('rejects calls missing required args', () => {
    expect(() => prepareToolArgs(createItemTool, { owner: 'o' })).toThrow(/missing required argument\(s\): title/);
  });
});

describe('executeTool', () => {
  it('maps a successful response', async () => {
    const fetchImpl = createFakeFetch(200, { data: [{ id: 7 }] });

    const result = await executeTool(demoManifest, listItemsTool, { owner: 'o' }, { env: DEMO_ENV, fetchImpl });

    expect(result).toEqual([{ id: 7, author: null }]);
  });

  it('turns API errors into ToolError with the API message', async () => {
    const fetchImpl = createFakeFetch(404, { message: 'Not Found' });

    const call = executeTool(demoManifest, listItemsTool, { owner: 'o' }, { env: DEMO_ENV, fetchImpl });

    await expect(call).rejects.toThrow(ToolError);
    await expect(call).rejects.toThrow('demo API 404: Not Found');
  });

  it('returns non-JSON bodies as text', async () => {
    const fetchImpl = createFakeFetch(200, 'plain');

    const result = await executeTool(
      demoManifest,
      createItemTool,
      { owner: 'o', title: 't' },
      { env: DEMO_ENV, fetchImpl },
    );

    expect(result).toBe('plain');
  });
});
