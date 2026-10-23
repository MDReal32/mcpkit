import type { IncomingMessage } from 'node:http';
import { CREDENTIALS_FORM_SESSION_HEADER } from '@mcpkit/core';
import type { FormSession } from '../types/form-session';

/** The Host check stops DNS rebinding; the token from the URL fragment proves the caller loaded this page. */
export const isSessionRequest = (session: FormSession, incoming: IncomingMessage, requireToken: boolean) => {
  if (incoming.headers.host !== session.host) {
    return false;
  }
  return !requireToken || incoming.headers[CREDENTIALS_FORM_SESSION_HEADER.toLowerCase()] === session.token;
};
