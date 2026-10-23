import { CREDENTIALS_FORM_API } from '@usemcpkit/core';
import { createSessionHeaders } from './create-session-headers';

export const cancelCredentials = async () => {
  await fetch(CREDENTIALS_FORM_API.cancel, { method: 'POST', headers: createSessionHeaders() });
};
