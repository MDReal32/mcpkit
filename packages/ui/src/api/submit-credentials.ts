import type { CredentialResponse } from '@mcpkit/core';
import { CREDENTIALS_FORM_API } from '@mcpkit/core';
import { postFormJson } from './post-form-json';

export const submitCredentials = (answer: CredentialResponse, requestFailed: string) =>
  postFormJson(CREDENTIALS_FORM_API.submit, answer, requestFailed);
