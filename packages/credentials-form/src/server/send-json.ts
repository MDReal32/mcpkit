import type { ServerResponse } from 'node:http';

export const sendJson = (response: ServerResponse, status: number, body: unknown) => {
  response
    .writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' })
    .end(JSON.stringify(body));
};
