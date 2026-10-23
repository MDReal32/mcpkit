import { openBrowser } from '../browser/open-browser';
import { printError } from './print-error';

/** stderr only: in serve mode stdout carries JSON-RPC. */
export const announceAuthorizationUrl = (url: string) => {
  printError(`Sign-in required, open this URL to authorize:\n  ${url}`);
  openBrowser(url);
};
