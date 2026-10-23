import type { CredentialRequest } from '@usemcpkit/core';
import { CREDENTIALS_REQUEST_ELEMENT_ID } from '@usemcpkit/core';

const REQUEST_ELEMENT = new RegExp(`(<script[^>]*\\bid="${CREDENTIALS_REQUEST_ELEMENT_ID}"[^>]*>)\\s*(</script>)`);

/** Puts the request into the page's empty JSON element; `<` is escaped so the data can never close the script. */
export const injectCredentialRequest = (page: string, request: CredentialRequest) => {
  if (!REQUEST_ELEMENT.test(page)) {
    throw new Error(`the credentials page has no empty #${CREDENTIALS_REQUEST_ELEMENT_ID} script element`);
  }
  const json = JSON.stringify(request).replaceAll('<', '\\u003c');
  return page.replace(REQUEST_ELEMENT, (_match, open: string, close: string) => `${open}${json}${close}`);
};
