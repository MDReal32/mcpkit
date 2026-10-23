import { openBrowser } from "../browser/open-browser";
import { printError } from "./print-error";

export const announceCredentialsFormUrl = (url: string) => {
  printError(`Credentials required, open this URL to enter them:\n  ${url}`);
  openBrowser(url);
};
