import { randomBytes } from 'node:crypto';
import { createServer } from 'node:http';
import type { CredentialRequest, CredentialResponse } from '@usemcpkit/core';
import { FORM_CLOSED_MESSAGE, FORM_HOST, SESSION_TOKEN_BYTES } from '../const';
import { injectCredentialRequest } from '../inject-credential-request';
import type { FormServer } from '../types/form-server';
import type { FormSession } from '../types/form-session';
import { handleFormRequest } from './handle-form-request';

/** Serves the form on a free loopback port until the page answers or is cancelled. */
export const startFormServer = async (request: CredentialRequest, page: string) => {
  const server = createServer();
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, FORM_HOST, resolve);
  });
  const address = server.address();
  if (address === null || typeof address === 'string') {
    server.close();
    throw new Error('credentials form server has no TCP address');
  }
  const host = `${FORM_HOST}:${address.port}`;
  const token = randomBytes(SESSION_TOKEN_BYTES).toString('base64url');
  const response = new Promise<CredentialResponse>((resolve, reject) => {
    const session: FormSession = {
      request,
      page: injectCredentialRequest(page, request),
      token,
      host,
      answer: resolve,
      cancel: () => reject(new Error(FORM_CLOSED_MESSAGE)),
    };
    server.on('request', (incoming, outgoing) => {
      handleFormRequest(session, incoming, outgoing).catch((error: unknown) => {
        outgoing.destroy(error instanceof Error ? error : undefined);
      });
    });
  });
  const formServer: FormServer = {
    url: `http://${host}/#${token}`,
    response,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.closeIdleConnections();
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  };
  return formServer;
};
