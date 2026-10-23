import type { TokenImportRequest } from '@mcpkit/core';
import { CREDENTIALS_FORM_API } from '@mcpkit/core';
import { postFormJson } from './post-form-json';

export const importCliToken = (request: TokenImportRequest, requestFailed: string) =>
  postFormJson(CREDENTIALS_FORM_API.import, request, requestFailed);
