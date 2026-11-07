import type { CredentialRequest } from "@usemcpkit/core";
import { CREDENTIALS_REQUEST_ELEMENT_ID } from "@usemcpkit/core";
import { readWindowContext } from "../window/read-window-context";

/** The request the window app handed over, or else the one the server injected into the page it serves. */
export const readInjectedRequest = () => {
  const windowContext = readWindowContext();
  if (windowContext) {
    const fromWindow: CredentialRequest = JSON.parse(JSON.stringify(windowContext.request));
    return fromWindow;
  }
  const text = document.getElementById(CREDENTIALS_REQUEST_ELEMENT_ID)?.textContent?.trim();
  if (!text) {
    throw new Error(`the page has no request in #${CREDENTIALS_REQUEST_ELEMENT_ID}`);
  }
  const request: CredentialRequest = JSON.parse(text);
  return request;
};
