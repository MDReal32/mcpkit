import { CREDENTIALS_FORM_SESSION_HEADER } from '@mcpkit/core';
import { readSessionToken } from './read-session-token';

export const createSessionHeaders = () => ({
  [CREDENTIALS_FORM_SESSION_HEADER]: readSessionToken(),
  'Content-Type': 'application/json',
});
