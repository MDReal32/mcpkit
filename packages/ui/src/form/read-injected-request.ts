import type { CredentialRequest } from '@usemcpkit/core';
import { CREDENTIALS_REQUEST_ELEMENT_ID } from '@usemcpkit/core';

export const readInjectedRequest = () => {
  const text = document.getElementById(CREDENTIALS_REQUEST_ELEMENT_ID)?.textContent?.trim();
  if (!text) {
    throw new Error(`the page has no request in #${CREDENTIALS_REQUEST_ELEMENT_ID}`);
  }
  const request: CredentialRequest = JSON.parse(text);
  return request;
};
